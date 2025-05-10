import fs from 'fs';
import path from 'path';

const designsDirectory = path.join(process.cwd(), 'content');

function readAllDesignsData(){
  const designs = [];
  const fileNames = fs.readdirSync(designsDirectory);
  fileNames.forEach((fileName) => {
    const fullPath = path.join(designsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const data = JSON.parse(fileContents);
    designs.push(...data);
  });
  return designs;
}

function getSortedDesignsData(designs, sortBy) {
  const parsePrice = (price) => parseFloat(price.replace(/[^0-9.-]+/g, ""));

  const sortByTag = (tagsA, tagsB, sortIdA, sortIdB, tag) => {
      const hasTagA = tagsA.includes(tag);
      const hasTagB = tagsB.includes(tag);
      if (hasTagA && !hasTagB) return -1;
      if (!hasTagA && hasTagB) return 1;

      return sortIdB - sortIdA;
    }

  switch (sortBy) {
    case 'PLTOH':
      designs.sort((a, b) => {
        const priceA = parsePrice(a.price);
        const priceB = parsePrice(b.price);
        return priceA - priceB;
      })
      break;

    case 'PHTOL':
      designs.sort((a, b) => {
        const priceA = parsePrice(a.price);
        const priceB = parsePrice(b.price);
        return priceB - priceA;
      })
    break;

    case 'NEW':
      designs.sort((a, b) => sortByTag(a.tags, b.tags, a.sortId, b.sortId, 'NEW'));
      break;

    case 'POP':
      designs.sort((a, b) => sortByTag(a.tags, b.tags, a.sortId, b.sortId, 'POPULAR'));
    break;
  
    default:
      designs.sort((a, b) => a.sortId - b.sortId);
      break;
  }
}

function getFilteredDesigns(designs, searchString){
  return designs.filter(d => (d.name && d.name.toLowerCase().includes(searchString)) || (d.description && d.description.toLowerCase().includes(searchString)));
}

export function getDesignsData(page = 1, limit = 4, sortBy, searchString) {
  var designs = readAllDesignsData();
  getSortedDesignsData(designs, sortBy.toUpperCase());
  if (searchString){
    designs = getFilteredDesigns(designs, searchString.toLowerCase());
  }
  const startIndex = (page - 1) * limit;
  const currentPage = designs.slice(startIndex, startIndex + limit);
  return {
    designs: currentPage,
    count: designs.length,
    pages: Math.ceil(designs.length / limit)
  };
}

export function getDesignById(id){
  var designs = readAllDesignsData();
  if (id){
    var design = designs.filter(d => (d.id) && (d.id === id));
    return design;
  }
}


