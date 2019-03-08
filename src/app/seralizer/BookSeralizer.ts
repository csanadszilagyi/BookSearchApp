import { Book } from '../models/book.model';
import { ISerializer } from './ISerializer';

export class BookSerializer implements ISerializer<Book>{
    fromJson(responseItem: any): Book {
        const vol = responseItem.volumeInfo;
        return new Book(
            vol.title || '',
            vol.subtitle || '',
            (vol.authors && vol.authors.join(', ')) || '',                      
            vol.description || '',
            new Date(vol.publishedDate).getFullYear().toString() || '',         // only need the year from date
            vol.pageCount || null,
            vol.previewLink || '',
            vol.infoLink || '',
            vol.averageRating || null,
            vol.categories || '',
            (vol.imageLinks && vol.imageLinks.smallThumbnail) || ''
        );
    }

    // no need
    toJson(obj: Book): any {
        return JSON.stringify(obj);
    }
}