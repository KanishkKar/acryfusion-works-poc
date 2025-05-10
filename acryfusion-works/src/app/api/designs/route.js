import { getDesignsData } from '../../../utilities/designs';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page')) || 1;
  const limit = parseInt(searchParams.get('limit')) || 4;
  const sortBy = searchParams.get('sortBy') || '';

  const designs = getDesignsData(page, limit, sortBy);

  return new Response(JSON.stringify(designs), {
    headers: { 'Content-Type': 'application/json' },
  });
}
