import React from 'react';
import {Link} from 'react-router';

//import {getTopicList,login} from '../lib/client';
import {
    getLoginUser,
    getTopicList,
    login,
    logout,
    signup,
    addTopic,
    updateTopic,
    deleteTopic,
    addComment,
    deleteComment
} from '../lib/client';


export default class TopicList extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
    }
    
    componentDidMount(){
        getLoginUser({});

        // login({name:"hello",password:"123456"})
        // .then(ret => console.log(ret))
        // .error(err => console.error(err));

        //X9gHoSG5PX9IAmqDPJ2I

        // logout("Krmft8XHSQamUbmPV5sA");
        
        // signup({name:"gogogo",password:"123456",email:"gogogo@gmail.com"})
        // .then(ret => console.log(ret))
        // .error(err => console.error(err));

        // addTopic({
        //     title:"测试request",
        //     content:"测试request-content",
        //     tags:"测试,request"
        // })
        // .then(ret => console.log(ret))
        // .catch(err => console.error(err));

        // updateTopic({
        //     topicId:"570f1fd92cf70e1b6e14daeb",
        //     title:"测试request-contenthaha",
        //     content:"测试request-content",
        //     tags:"测试,request"
        // })
        // .then(ret => console.log(ret))
        // .catch(err => console.error(err));

        // deleteTopic("570f1fd92cf70e1b6e14daeb")
        // .then(ret => console.log(ret))
        // .catch(err => console.error(err));

        // addComment({
        //     topicId:"570f27462cf70e1b6e14daec",
        //     content:"测试request-content-add"
        // })
        // .then(ret => console.log(ret))
        // .catch(err => console.error(err));

        // deleteComment({
        //     topicId:"570f27462cf70e1b6e14daec",
        //     cid:"570f27ca2cf70e1b6e14daf2"
        // })
        // .then(ret => console.log(ret))
        // .catch(err => console.error(err));

        getTopicList({})
        .then(ret => this.setState({list:ret.list}))
        .catch(err => console.error(err));
    }
    
    render() {
        const list = Array.isArray(this.state.list)?this.state.list:[];
        return (
            <div>
                <ul className="list-group">
                    {list.map((item, i) => {
                        return (
                            <Link to={`/topic/${item._id}`} className="list-group-item" key={i}>{item.title}</Link>
                        )
                    })}
                </ul>
            </div>
        )
    }
}