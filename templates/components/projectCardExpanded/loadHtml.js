document.addEventListener('DOMContentLoaded', () => {
    fetch('../../projects/meta/422-tsiraM/README.html')
            .then(response => response.text())
            .then(data => {
                console.log(data)
                const README = data
            // document.getElementById('content').innerHTML = data;
    });
});
