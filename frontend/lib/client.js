import browserRequest from 'browser-request';

const urlBase = '/api/';

export function request(method, path, data = {}){
    return new Promise((resolve, reject) => {
        method = method.toUpperCase();
        const options = {
            method,
            url:`${urlBase}/${path}`
        };
        if(method === 'GET' || method === 'HEAD'){
            options.qs = data;
        }else{
            options.form = data;
        }
        browserRequest(options,(err, res, body) => {
            if(err){
                reject(err);
            } else {
                let data;
                try{
                    data = JSON.parse(body.toString());
                }catch(err){
                    return reject(new Error('parse JSON data error:'+err.message));
                }
                if(data.error){
                    reject(data.error)
                }else{
                    resolve(data.result);
                }
            }
        });
        
    });
}
export function getLoginUser(){
    return request('get','login_user',{});
}

export function login(options){
    return request('post','login',options);
}

export function logout(token){
    return request('get',`logout?token=${token}`,{});
}

export function signup(options){
    return request('post','signup',options);
}

//topic
export function getTopicList(options){
    return request('get','topic/list', {});
}

export function getTopicDetail(id){
    return request('get',`topic/item/${id}`).then(ret => ret.topic);
}

export function addTopic(options){
    return request('post','topic/add',options);
}

export function updateTopic(options){
    return request('post',`topic/item/${options.topicId}`,options);
}

export function deleteTopic(topicId){
    return request('delete',`topic/item/${topicId}`,{});
}

//comment
export function addComment(options){
    return request('post',`topic/item/${options.topicId}/comment/add`,options);
}
export function deleteComment(options){
    return request('post',`topic/item/${options.topicId}/comment/delete`,options);
}
