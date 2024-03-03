import React from 'react';
import './FilmList.css';

class FilmList extends React.Component {
    Url;
    SerializedElements;

    constructor(props) {
        super(props);
        this.state = { items: [], text: '', url: '' };
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeUrl = this.handleChangeUrl.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.fileHandleChange = this.fileHandleChange.bind(this);
        this.handleLoad = this.handleLoad.bind(this);

        this.SerializedElements = this.handleLoad();
    }

    render() {
        return (
            <div>
                <h2>Список фильмов</h2>

                <TodoList items={ this.state.items} ser = {this.SerializedElements} />
                <form onSubmit={this.handleSubmit} >
                    <label htmlFor="new-todo">
                        Добавить фильм:<br/><br/>
                        Название: &nbsp; &nbsp; &nbsp; &nbsp;
                        <input
                            id="new-todo"
                            onChange={this.handleChange}
                            value={this.state.text}
                        />
                        <br/><br/>
                        Ссылка IMDb: &nbsp;
                        <input
                            id="new-url"
                            onChange={this.handleChangeUrl}
                            value={this.state.url}
                        />
                        <br/><br/>
                        <label>Выберите файл: &nbsp;

                        <input type="file"
                               id="avatar"
                               name="avatar"
                               accept="image/png, image/jpeg, image/jpg"
                               onChange={this.fileHandleChange}
                        />
                        </label>

                    </label>

                    <button>
                        Добавить
                    </button>
                </form>
            </div>
        );
    }

    handleChange(e) {
        this.setState({ text: e.target.value  });
    }
    handleChangeUrl(e){
        this.setState({ url: e.target.value  });

    }
    fileHandleChange(e) {
        if (e.target.files.length === 0) return;

        const reader = new FileReader();
        reader.addEventListener('load', (event) => {
            this.Url = event.target.result;
        });
        reader.readAsDataURL(e.target.files[0]);
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.text.length === 0 || this.state.url.length === 0) {
            return;
        }
        const newItem = {
            text: this.state.text,
            url: this.state.url,
            src: this.Url,
            id: Date.now()
        };
        this.setState(state => ({
            items: state.items.concat(newItem),
            url: '',
            text: ''
        }));

        if (this.state === "undefined" || this.state.items[localStorage.length - 1] === "undefined") return;

        localStorage.setItem(localStorage.length.toString(), JSON.stringify(newItem));


    }
     handleLoad(){
        const NewItems = [];
        for (let i = 0; i < localStorage.length; i++){
            if (localStorage.getItem(localStorage.key(i)) === "undefined") continue ;

            NewItems.concat([JSON.parse(localStorage.getItem(localStorage.key(i)))]);
        }

        return NewItems;
    }

}

class TodoList extends React.Component {
    render() {
        return (
            <ul>
                {this.props.items.map(item => (
                    <li key={item.id}>{item.text + ': ' + item.url}<br/><img src={item.src} alt = ""></img></li>
                ))}
                {this.props.ser.map(item => (
                    <li key={item.id}>{item.text + ': ' + item.url}<br/><img src={item.src} alt = ""></img></li>
                ))}
            </ul>
        );
    }
}
export default FilmList
