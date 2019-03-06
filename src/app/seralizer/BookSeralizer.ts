import { Book } from '../models/book.model';
import { ISerializer } from './ISerializer';

export class BookSerializer implements ISerializer<Book> {
    fromJson(responseItem: any): Book {

        const vol = responseItem.volumeInfo;
        return new Book(
            -1,
            vol.title || '',
            vol.subtitle || '',
            vol.authors || '',
            vol.description || '',
            vol.previewLink || '',
            vol.averageRating || '',
            vol.categories || '',
            vol.imageLinks && vol.imageLinks.smallThumbnail || ''
        );
    }

    // no need
    toJson(obj: Book): any {
        return JSON.stringify(obj);
    }
}