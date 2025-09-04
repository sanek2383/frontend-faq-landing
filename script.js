document.addEventListener('DOMContentLoaded', () => {
	const container = document.getElementById('faq-container')
	const modal = document.getElementById('modal')
	const modalTitle = document.getElementById('modal-title')
	const modalAnswer = document.getElementById('modal-answer')
	const closeBtn = document.getElementById('close-modal')
	const tabButtons = document.querySelectorAll('.tab-btn')

	// Соответствие вкладок и файлов
	const tabSources = {
		JavaScript: 'js.json',
		React: 'react.json',
		'ООП и Архитектура': 'oop.json',
	}

	// Переключение табов
	tabButtons.forEach(btn => {
		btn.addEventListener('click', () => {
			tabButtons.forEach(b => b.classList.remove('active'))
			btn.classList.add('active')
			loadTab(btn.dataset.tab)
		})
	})

	// Загрузка и отображение таба
	function loadTab(tabName) {
		const fileName = tabSources[tabName]
		container.innerHTML = '<p>Загрузка...</p>'

		fetch(fileName)
			.then(res => {
				if (!res.ok) throw new Error(`Файл не найден: ${fileName}`)
				return res.json()
			})
			.then(data => {
				renderQuestions(tabName, data)
			})
			.catch(err => {
				container.innerHTML = `<p style="color: red;">Ошибка: ${err.message}</p>`
				console.error(err)
			})
	}

	// Отображение вопросов
	function renderQuestions(tabName, questions) {
		container.innerHTML = ''

		const sectionEl = document.createElement('div')
		sectionEl.className = 'section'

		const title = document.createElement('h2')
		title.textContent = tabName
		sectionEl.appendChild(title)

		const ul = document.createElement('ul')
		ul.className = 'accordion'

		questions.forEach(({ question, answer }) => {
			const li = document.createElement('li')
			li.textContent = question
			li.addEventListener('click', () => openModal(tabName, question, answer))
			ul.appendChild(li)
		})

		sectionEl.appendChild(ul)
		container.appendChild(sectionEl)
	}

	// Модальное окно
	function openModal(section, question, answer) {
		modalTitle.textContent = `${question}`
		modalAnswer.textContent = answer
		modal.classList.remove('hidden')
	}

	closeBtn.addEventListener('click', () => {
		modal.classList.add('hidden')
	})

	modal.addEventListener('click', e => {
		if (e.target === modal) {
			modal.classList.add('hidden')
		}
	})

	// Загрузить первую вкладку по умолчанию
	const firstTab = document.querySelector('.tab-btn.active').dataset.tab
	loadTab(firstTab)
})
