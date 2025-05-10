import { getDesignsData } from '../../../utilities/designs';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page')) || 1;
  const limit = parseInt(searchParams.get('limit')) || 4;
  const sortBy = '';
  const query = searchParams.get('query') || '';

  const designs = getDesignsData(page, limit, sortBy, query);

  return new Response(JSON.stringify(designs), {
    headers: { 'Content-Type': 'application/json' },
  });
}
