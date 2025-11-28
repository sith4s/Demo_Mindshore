#!/usr/bin/env tsx

/**
 * MindShore Project Catalog - DOCX Ingestion Script
 * Converts Data Projects Demo.docx into structured JSON with client anonymization
 */

import * as fs from 'fs';
import * as path from 'path';
import mammoth from 'mammoth';
import { anonymizeProject, validateAnonymization } from '../src/lib/anonymize.js';
import { isValidProject, type Project } from '../src/lib/schema.js';

const INPUT_FILE = 'data/Data Projects Demo.docx';
const OUTPUT_FILE = 'public/projects.json';
const IMAGES_DIR = 'public/projects';

interface ParsedProject {
  title: string;
  client: string;
  category: string;
  summary: string;
  problem: string[];
  approach: string[];
  outcomes: string[];
  techStack: string[];
  tags: string[];
  images: { src: string; alt: string }[];
  date?: string;
}

/**
 * Main ingestion function
 */
async function ingestDocx(): Promise<void> {
  console.log('🚀 Starting DOCX ingestion process...');
  
  try {
    // Check if input file exists
    if (!fs.existsSync(INPUT_FILE)) {
      throw new Error(`Input file not found: ${INPUT_FILE}`);
    }
    
    // Ensure output directories exist
    fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
    fs.mkdirSync(IMAGES_DIR, { recursive: true });
    
    // Convert DOCX to HTML
    console.log('📄 Converting DOCX to HTML...');
    const result = await mammoth.convertToHtml(
      { path: INPUT_FILE },
      {
        convertImage: mammoth.images.imgElement(async (image) => {
          // Extract and save images
          const extension = image.contentType.split('/')[1] || 'png';
          const filename = `project-${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${extension}`;
          const imagePath = path.join(IMAGES_DIR, filename);
          
          await fs.promises.writeFile(imagePath, (image as any).buffer);
          console.log(`💾 Saved image: ${filename}`);
          
          return {
            src: `/projects/${filename}`,
            alt: 'Project screenshot'
          };
        })
      }
    );
    
    console.log('🔍 Parsing HTML content...');
    const projects = parseHtmlToProjects(result.value, result.messages);
    
    console.log(`📊 Parsed ${projects.length} projects`);
    
    // Anonymize projects
    console.log('🔒 Anonymizing client information...');
    const anonymizedProjects = projects.map((project, index) => {
      const anonymized = anonymizeProject(project);
      
      // Generate unique ID
      anonymized.id = generateProjectId(anonymized.title, index);
      
      // Validate anonymization
      const validation = validateAnonymization(JSON.stringify(anonymized));
      if (!validation.isValid) {
        console.warn(`⚠️  Anonymization concerns for project "${anonymized.title}":`, validation.concerns);
      }
      
      return anonymized;
    });
    
    // Validate project structure
    console.log('✅ Validating project data...');
    const validProjects = anonymizedProjects.filter(project => {
      if (!isValidProject(project)) {
        console.error(`❌ Invalid project structure: ${project.title || 'Unknown'}`);
        return false;
      }
      return true;
    });
    
    // Generate metadata
    const output = {
      metadata: {
        generated_at: new Date().toISOString(),
        source_file: INPUT_FILE,
        total_projects: validProjects.length,
        categories: [...new Set(validProjects.map(p => p.category))],
        version: '1.0.0'
      },
      projects: validProjects
    };
    
    // Write output file
    console.log('💾 Writing projects.json...');
    await fs.promises.writeFile(
      OUTPUT_FILE, 
      JSON.stringify(output, null, 2),
      'utf-8'
    );
    
    console.log('✨ Ingestion completed successfully!');
    console.log(`   📁 Output: ${OUTPUT_FILE}`);
    console.log(`   🖼️  Images: ${IMAGES_DIR}/`);
    console.log(`   📈 Projects: ${validProjects.length}`);
    console.log(`   🏷️  Categories: ${output.metadata.categories.join(', ')}`);
    
  } catch (error) {
    console.error('❌ Ingestion failed:', error);
    process.exit(1);
  }
}

/**
 * Parse HTML content into structured project data
 */
function parseHtmlToProjects(html: string, messages: any[]): ParsedProject[] {
  const projects: ParsedProject[] = [];
  
  // Log any conversion warnings
  if (messages.length > 0) {
    console.log('📝 Conversion messages:', messages);
  }
  
  // Split content by H1 headers (project titles)
  const sections = html.split(/<h1[^>]*>/i).slice(1); // Remove first empty section
  
  for (let i = 0; i < sections.length; i++) {
    try {
      const section = sections[i];
      const project = parseProjectSection(section, i);
      
      if (project.title) {
        projects.push(project);
        console.log(`📋 Parsed project: ${project.title}`);
      }
    } catch (error) {
      console.warn(`⚠️  Failed to parse project section ${i + 1}:`, error);
    }
  }
  
  return projects;
}

/**
 * Parse individual project section
 */
function parseProjectSection(html: string, index: number): ParsedProject {
  // Extract title (everything before first closing tag)
  const titleMatch = html.match(/^([^<]+)/);
  const title = titleMatch ? cleanText(titleMatch[1]) : `Project ${index + 1}`;
  
  // Initialize project
  const project: ParsedProject = {
    title,
    client: '',
    category: 'Data & AI', // Default category
    summary: '',
    problem: [],
    approach: [],
    outcomes: [],
    techStack: [],
    tags: [],
    images: [],
    date: new Date().toISOString().split('T')[0]
  };
  
  // Extract content sections
  const content = html.replace(/^[^<]+/, ''); // Remove title
  
  // Parse sections by looking for bold text or headers
  const sections = extractSections(content);
  
  for (const [sectionName, sectionContent] of Object.entries(sections)) {
    const cleanContent = cleanText(sectionContent);
    
    switch (sectionName.toLowerCase()) {
      case 'client':
        project.client = cleanContent || `Leading technology company ${index + 1}`;
        break;
      case 'summary':
        project.summary = cleanContent || `Advanced ${title.toLowerCase()} solution delivering measurable business value.`;
        break;
      case 'category':
        project.category = cleanContent || 'Data & AI';
        break;
      case 'problem':
      case 'problems':
      case 'challenge':
      case 'challenges':
        project.problem = parseListItems(sectionContent);
        break;
      case 'approach':
      case 'solution':
      case 'methodology':
        project.approach = parseListItems(sectionContent);
        break;
      case 'outcomes':
      case 'results':
      case 'benefits':
        project.outcomes = parseListItems(sectionContent);
        break;
      case 'tech stack':
      case 'technology':
      case 'technologies':
        project.techStack = parseCommaSeparated(sectionContent);
        break;
      case 'tags':
      case 'keywords':
        project.tags = parseCommaSeparated(sectionContent);
        break;
    }
  }
  
  // Generate default content if missing
  if (project.problem.length === 0) {
    project.problem = [`Complex data challenges requiring ${title.toLowerCase()} solutions`];
  }
  
  if (project.approach.length === 0) {
    project.approach = [`Implemented comprehensive ${title.toLowerCase()} methodology`];
  }
  
  if (project.outcomes.length === 0) {
    project.outcomes = ['Delivered measurable improvements in operational efficiency'];
  }
  
  if (project.techStack.length === 0) {
    project.techStack = ['Azure', 'Power BI', 'Python', 'Machine Learning'];
  }
  
  if (project.tags.length === 0) {
    project.tags = ['Data Analytics', 'AI', 'Business Intelligence'];
  }
  
  return project;
}

/**
 * Extract sections from HTML content
 */
function extractSections(html: string): Record<string, string> {
  const sections: Record<string, string> = {};
  
  // Look for bold text followed by content (common DOCX pattern)
  const boldPattern = /<strong[^>]*>([^<]+)<\/strong>[:\s]*([^<]*(?:<[^>]+>[^<]*)*?)(?=<strong|$)/gi;
  
  let match;
  while ((match = boldPattern.exec(html)) !== null) {
    const sectionName = cleanText(match[1]).replace(':', '');
    const sectionContent = match[2];
    sections[sectionName] = sectionContent;
  }
  
  // Also look for paragraph-based sections
  const paragraphs = html.split(/<\/?p[^>]*>/i).filter(p => p.trim());
  
  for (let i = 0; i < paragraphs.length - 1; i++) {
    const current = cleanText(paragraphs[i]);
    if (current.endsWith(':') && current.length < 50) {
      const sectionName = current.replace(':', '');
      const sectionContent = paragraphs[i + 1];
      if (!sections[sectionName]) {
        sections[sectionName] = sectionContent;
      }
    }
  }
  
  return sections;
}

/**
 * Parse list items from HTML
 */
function parseListItems(html: string): string[] {
  const items: string[] = [];
  
  // Extract list items
  const listItemPattern = /<li[^>]*>([^<]*(?:<[^>]+>[^<]*)*?)<\/li>/gi;
  let match;
  
  while ((match = listItemPattern.exec(html)) !== null) {
    const item = cleanText(match[1]);
    if (item) items.push(item);
  }
  
  // If no list items found, split by bullet points or line breaks
  if (items.length === 0) {
    const text = cleanText(html);
    const lines = text.split(/[•\-\*]\s*|\n/).filter(line => line.trim());
    items.push(...lines.filter(line => line.length > 10));
  }
  
  return items.length > 0 ? items : ['Comprehensive solution implementation'];
}

/**
 * Parse comma-separated values
 */
function parseCommaSeparated(html: string): string[] {
  const text = cleanText(html);
  return text.split(/[,;]\s*/).filter(item => item.trim().length > 0);
}

/**
 * Clean HTML and normalize text
 */
function cleanText(html: string): string {
  return html
    .replace(/<[^>]+>/g, '') // Remove HTML tags
    .replace(/&nbsp;/g, ' ') // Replace non-breaking spaces
    .replace(/&amp;/g, '&') // Replace HTML entities
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();
}

/**
 * Generate unique project ID from title
 */
function generateProjectId(title: string, index: number): string {
  const base = title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '-')
    .substring(0, 50);
  
  return `${base}-${index + 1}`;
}

// Run the ingestion if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  ingestDocx().catch(console.error);
}