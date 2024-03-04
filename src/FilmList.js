import React from 'react';
import './FilmList.css';

class FilmList extends React.Component {
    Url;
    SerializedElements;

    constructor(props) {
        super(props);
        this.state = { items: [], text: '', url: '', checked: false };
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeUrl = this.handleChangeUrl.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.fileHandleChange = this.fileHandleChange.bind(this);
        this.handleLoad = this.handleLoad.bind(this);
    }

    render() {
        return (
            <div>
                <h2>Список фильмов</h2>

                <TodoList items={this.state.items.concat(this.handleLoad())} />
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
            checked: this.state.checked,
            id: Date.now()
        };
        this.setState(state => ({
            items: state.items.concat(newItem),
            url: '',
            text: ''
        }));

        localStorage.setItem(newItem.id.toString(), JSON.stringify(newItem));
    }
     handleLoad(){
        let NewItems = [];

        for (let i = 0; i < localStorage.length; i++){
            //if (localStorage.getItem(localStorage.key(i)) === "undefined") continue ;

            NewItems.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
        }

        return NewItems;
    }

}

class TodoList extends React.Component {


    render() {
        return (
            <h6>
                <ul id = "my-list">

                    {this.props.items.map(item => (

                            <li key={item.id} id = {item.id}>{item.text + ': ' + item.url}<br/><br/><img src={item.src} alt = ""></img><br/>

                                <label htmlFor={item.id + ": label"}>Просмотрено:
                                    <input id={item.id + ": label"}  type="checkbox" value="IsWatched"  onChange={() => function (){
                                        const newItem = JSON.parse(localStorage.getItem(item.id));
                                        localStorage.removeItem(item.id);
                                        newItem.checked = !newItem.checked;
                                        localStorage.setItem(item.id, item);

                                        item = newItem;

                                    }} checked={item.checked}></input>
                                </label>
                                <form onSubmit={()  => function (){
                                    localStorage.removeItem(item.id);

                                    this.innerHTML = '';
                                }}>
                                    <button>Удалить</button>
                                </form>
                                <br/><br/><br/>
                            </li>

                    ))}


                </ul>
            </h6>

        );
    }
}
export default FilmList
