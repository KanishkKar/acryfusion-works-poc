import { getDesignById } from '../../../utilities/designs';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id') || '';

  const design = getDesignById(id);

  return new Response(JSON.stringify(design), {
    headers: { 'Content-Type': 'application/json' },
  });
}
