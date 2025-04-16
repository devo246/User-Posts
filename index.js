document.getElementById('btn').addEventListener('click', () => {
    const icon = document.getElementById('btn').querySelector('i')
    icon.classList.toggle('fa-bars')
    icon.classList.toggle('fa-xmark')
})

async function getPosts(id) {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts?userId=" + id)

        if (!response.ok) {
            throw new Error(`Failed to fetch (${response.status})`)
        }

        const data = await response.json()
        const parentElement = document.getElementById("results")
        parentElement.textContent = ""

        let h2 = document.createElement('h2')
        h2.textContent = 'Select User'


        const fragment = document.createDocumentFragment()

        data.forEach((item) => {
            h2.style.display = 'none'
            let div = document.createElement('div')
            div.className = 'result'

            let title = document.createElement('p')
            title.className = 'title'
            title.textContent = item.title

            let hr = document.createElement('hr')

            let body = document.createElement('p')
            body.className = 'body'
            body.textContent = item.body

            div.append(title, hr, body)
            fragment.appendChild(div)
        })

        parentElement.append(fragment, h2)

    } catch (error) {
        alert(`Error: ${error.message}`)
        console.error("Error details:", error)
    }
}

async function getUsers() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users")

        if (!response.ok) {
            throw new Error(`Failed to fetch (${response.status})`)
        }

        const data = await response.json()
        const parentElement = document.getElementById("users")
        parentElement.textContent = ""

        const fragment = document.createDocumentFragment()

        data.forEach((item) => {
            let div = document.createElement('div')
            div.className = 'btns'

            let name = document.createElement('p')
            name.textContent = item.name

            let email = document.createElement('em')
            email.textContent = item.email

            div.append(name, email)
            fragment.appendChild(div)

            // كل الأحداث في مكان واحد
            div.addEventListener('click', () => {
                // إزالة الكلاس active من كل العناصر
                document.querySelectorAll('.btns').forEach(b => b.classList.remove('active'))
                // إضافة الكلاس للعنصر الحالي
                div.classList.add('active')
                // عرض المنشورات
                userClicked(item.id)
                
                document.getElementById('check').checked = false

                // ✅ رجّع الأيقونة لـ fa-bars
                const icon = document.getElementById('btn').querySelector('i')
                icon.classList.add('fa-bars')
                icon.classList.remove('fa-xmark')
            })
        })

        parentElement.appendChild(fragment)

    } catch (error) {
        alert(`Error: ${error.message}`)
        console.error("Error details:", error)
    }
}

function userClicked(id) {
    getPosts(id)
}

// اظهار المستخدمين قبل المنشورات
getUsers().then(() => {
    getPosts()
})
