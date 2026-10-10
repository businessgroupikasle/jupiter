/**
 * PageSpeed Insights API CLI Runner
 * Fetches and displays CrUX & Lighthouse metrics for a target URL.
 * 
 * Usage:
 *   node scripts/run-pagespeed.cjs [targetUrl] [--strategy=mobile|desktop]
 *   npm run pagespeed
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Load environment variables if available
const envPath = path.resolve(__dirname, '../.env');
let envApiKey = '';
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  const match = envContent.match(/(?:VITE_)?PAGESPEED_API_KEY\s*=\s*(.+)/);
  if (match) {
    envApiKey = match[1].trim();
  }
}

const API_KEY = process.env.PAGESPEED_API_KEY || envApiKey || 'AIzaSyCt8VNhlyTMJLOZ8dudMA6ndnLUzUTA63I';
const args = process.argv.slice(2);

let targetUrl = 'https://jupitergroups.in/';
let strategy = 'mobile'; // 'mobile' | 'desktop'
let saveJson = false;

for (const arg of args) {
  if (arg.startsWith('--strategy=')) {
    strategy = arg.split('=')[1].toLowerCase();
  } else if (arg === '--desktop') {
    strategy = 'desktop';
  } else if (arg === '--mobile') {
    strategy = 'mobile';
  } else if (arg === '--json') {
    saveJson = true;
  } else if (arg.startsWith('http://') || arg.startsWith('https://')) {
    targetUrl = arg;
  }
}

async function run() {
  console.log('\n========================================================');
  console.log('       GOOGLE PAGESPEED INSIGHTS API AUDIT RUNNER        ');
  console.log('========================================================');
  console.log(`Target URL : ${targetUrl}`);
  console.log(`Strategy   : ${strategy.toUpperCase()}`);
  console.log(`API Key    : ${API_KEY ? API_KEY.slice(0, 8) + '...' + API_KEY.slice(-4) : 'None'}`);
  console.log('Fetching PageSpeed data from Google API... (takes ~10-15s)\n');

  const apiEndpoint = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';
  const url = new URL(apiEndpoint);
  url.searchParams.set('url', targetUrl);
  url.searchParams.set('strategy', strategy);
  url.searchParams.append('category', 'PERFORMANCE');
  url.searchParams.append('category', 'ACCESSIBILITY');
  url.searchParams.append('category', 'BEST_PRACTICES');
  url.searchParams.append('category', 'SEO');

  if (API_KEY) {
    url.searchParams.set('key', API_KEY);
  }

  try {
    const data = await fetchJson(url.toString());

    if (saveJson) {
      const filename = `pagespeed-report-${strategy}.json`;
      fs.writeFileSync(filename, JSON.stringify(data, null, 2));
      console.log(`Full JSON report saved to ${filename}`);
    }

    // 1. Initial Info
    console.log(`Page tested: ${data.id || targetUrl}`);
    console.log(`Fetch Time : ${data.analysisUTCTimestamp || new Date().toISOString()}`);

    // 2. Category Scores
    const categories = data.lighthouseResult?.categories || {};
    console.log('\n----------------- CATEGORY SCORES ------------------');
    for (const key in categories) {
      const cat = categories[key];
      const score = Math.round((cat.score || 0) * 100);
      const rating = score >= 90 ? '🟢 GOOD' : score >= 50 ? '🟡 NEEDS IMPROVEMENT' : '🔴 POOR';
      console.log(`  ${cat.title.padEnd(20)}: ${score.toString().padStart(3)}/100  ${rating}`);
    }

    // 3. Chrome User Experience Report (CrUX)
    console.log('\n--------- CHROME USER EXPERIENCE REPORT (CrUX) ------');
    if (data.loadingExperience?.metrics) {
      const crux = data.loadingExperience.metrics;
      const cruxMetrics = {
        'First Contentful Paint (FCP)': crux.FIRST_CONTENTFUL_PAINT_MS?.category || 'N/A',
        'Interaction to Next Paint (INP)': crux.INTERACTION_TO_NEXT_PAINT?.category || 'N/A',
        'Largest Contentful Paint (LCP)': crux.LARGEST_CONTENTFUL_PAINT_MS?.category || 'N/A',
        'Cumulative Layout Shift (CLS)': crux.CUMULATIVE_LAYOUT_SHIFT_SCORE?.category || 'N/A',
        'First Input Delay (FID)': crux.FIRST_INPUT_DELAY_MS?.category || 'N/A',
      };

      for (const [key, val] of Object.entries(cruxMetrics)) {
        const badge = val === 'FAST' || val === 'GOOD' ? '🟢' : val === 'AVERAGE' || val === 'NEEDS_IMPROVEMENT' ? '🟡' : val === 'N/A' ? '⚪' : '🔴';
        console.log(`  ${key.padEnd(35)}: ${badge} ${val}`);
      }
    } else {
      console.log('  No CrUX origin data available for this URL yet.');
    }

    // 4. Lighthouse Lab Metrics
    console.log('\n---------------- LIGHTHOUSE LAB RESULTS -------------');
    const lh = data.lighthouseResult;
    if (lh?.audits) {
      const lighthouseMetrics = {
        'First Contentful Paint': lh.audits['first-contentful-paint']?.displayValue,
        'Speed Index': lh.audits['speed-index']?.displayValue,
        'Largest Contentful Paint': lh.audits['largest-contentful-paint']?.displayValue,
        'Total Blocking Time': lh.audits['total-blocking-time']?.displayValue,
        'Cumulative Layout Shift': lh.audits['cumulative-layout-shift']?.displayValue,
        'Time To Interactive': lh.audits['interactive']?.displayValue,
      };

      for (const [key, val] of Object.entries(lighthouseMetrics)) {
        console.log(`  ${key.padEnd(30)}: ${val || 'N/A'}`);
      }
    }

    console.log('\n========================================================\n');
  } catch (error) {
    console.error('\n❌ Fetching PageSpeed Insights failed:');
    console.error(error.message || error);
    process.exit(1);
  }
}

function fetchJson(targetUrl) {
  return new Promise((resolve, reject) => {
    https.get(targetUrl, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        if (res.statusCode < 200 || res.statusCode >= 300) {
          return reject(new Error(`HTTP error! status: ${res.statusCode} - ${body}`));
        }
        try {
          resolve(JSON.parse(body));
        } catch (e) {
          reject(new Error(`Failed to parse JSON response: ${e.message}`));
        }
      });
    }).on('error', reject);
  });
}

run();
