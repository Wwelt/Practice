import React from 'react';
import './FilmList.css';

class FilmList extends React.Component {
    Url;
    SerializedElements;

    localStorageCount;

    constructor(props) {
        super(props);
        this.state = { items: [], text: '', url: ''};
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

                <TodoList items={localStorage.length  > 0 ?this.handleLoad().concat( this.state.items) : this.state.items} />
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

        let newItems = [{
            text: this.state.text,
            url: this.state.url,
            src: this.Url,
            id: Date.now()
        }];

        if (localStorage.length > 0){


            const temp = JSON.parse(localStorage.getItem('items'));

           /* if (newItems[0].isArray){
                newItems[0].push(temp);
            }
            else{
            }*/

            /*if (localStorage.length === 0){
            }
            else{

            }*/

            newItems = newItems.concat(temp);


        }

        this.setState(() => ({
            items: newItems,
            url: '',
            text: ''
        }));

        localStorage.setItem('items' , JSON.stringify(newItems));
    }
     handleLoad(){
        return localStorage.length > 0 ? [JSON.parse(localStorage.getItem('items'))] : [];
    }

}

class TodoList extends React.Component {

    liCount = 0;


    render() {
        if (localStorage.length > 0)
            if (JSON.parse(localStorage.getItem('items')).length === 0) return ;

        let ser =this.props.items[0];

        if (ser.isArray){

        }
        return (
            <h6>
                <ul id = "my-list">

                    {ser.map(item => (

                            <li key={Math.random()}>{item.text + ': ' + item.url}<br/>
                                <br/>
                                <img src={item.src} alt = ""></img>
                                <br/>
                                <form onSubmit={() => {

                                    if (localStorage.length === 0) return;

                                    const oldState = JSON.parse(localStorage.getItem('items'));

                                    const newState = JSON.stringify([oldState].filter(el => el.id !== item.id));

                                    localStorage.setItem('items', newState);

                                    this.innerHTML = '';
                                }}>
                                    <button>Удалить</button>
                                </form>
                                <br/><br/><br/>
                            </li>

                    ))}
                    <script>

                    </script>


                </ul>
            </h6>

        );
    }
}
export default FilmList
