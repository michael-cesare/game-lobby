
export function isEmpty(id: any): boolean {
  return id === null || id === undefined || (typeof id === 'string' && id.trim() === '') || (typeof id === 'number' && isNaN(id));
}
