
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


export function backendLookup(method, endpoint, callback, data) {
    var jsonData
    if (data) {
        // jsonData = JSON(data)
        jsonData = JSON.stringify(data)
    }
    const xhr = new XMLHttpRequest()
    const url = `http://127.0.0.1:8000/api${endpoint}`
    xhr.responseType = "json"

    const csrftoken = getCookie('csrftoken');

    xhr.open(method, url)
    xhr.setRequestHeader("Content-Type", "application/json")

    if (csrftoken) {
        xhr.setRequestHeader("HTTP_X_REQUESTED_WITH", "XMLHttpRequest")
        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest")
        //https://docs.djangoproject.com/fr/2.2/ref/csrf/
        xhr.setRequestHeader("X-CSRFToken", csrftoken)
    }

    xhr.onload = function () {
        callback(xhr.response, xhr.status)
    }
    xhr.onerror = function () {
        callback({ "message": "The request was an error" }, 400)
    }
    console.log(jsonData)
    console.log(typeof jsonData);
    xhr.send(jsonData) //triggers the request

}
