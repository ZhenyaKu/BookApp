import { Book, GenreGroup } from '../types';

export const groupByGenre = (books: Book[]): GenreGroup[] => {
  if (!books || books.length === 0) {
    return [];
  }

  const genreMap = new Map<string, Book[]>();

  books.forEach(book => {
    const genre = book.genre || 'Other';
    if (!genreMap.has(genre)) {
      genreMap.set(genre, []);
    }
    genreMap.get(genre)!.push(book);
  });

  const genreGroups: GenreGroup[] = Array.from(genreMap.entries()).map(
    ([genre, genreBooks]) => ({
      genre,
      books: genreBooks,
    }),
  );

  return genreGroups.sort((a, b) => a.genre.localeCompare(b.genre));
};
