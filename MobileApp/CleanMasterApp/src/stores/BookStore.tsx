import {observable, action, decorate} from 'mobx';
import {BookService} from "../services/BookService";
import {BookSearchModel, BookViewModel} from "../models/BookModels";
import {AxiosResponse} from "axios";

class BookStore {

    isLoadingBook: boolean = false;
    error?: string;
    books: BookViewModel[] = [];

    loadBooks(searchModel?: BookSearchModel) {
        /*this.isLoadingBook = true;
        this.books = [];
        BookService.getBooks(searchModel)
            .then(action(( response) => {
                const result = response as AxiosResponse<BookViewModel[]>;
                this.books = result.data;
            }))
            .catch(action((err: any) => {
                this.error = err;
            }))
            .finally(action(() => {
                this.isLoadingBook = false;
            }))*/
    }
}

decorate(BookStore, {
    isLoadingBook: observable,
    books: observable,
    error: observable,
    loadBooks: action
});

export default BookStore;