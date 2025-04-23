document.addEventListener('DOMContentLoaded', () => {
    fetch('questions.json')
      .then(res => res.json())
      .then(data => {
        const container = document.getElementById('faq-container');
  
        for (const section in data) {
          const sectionEl = document.createElement('div');
          sectionEl.className = 'section';
  
          const title = document.createElement('h2');
          title.textContent = section;
          sectionEl.appendChild(title);
  
          const ul = document.createElement('ul');
          ul.className = 'accordion';
  
          data[section].forEach(({ question, answer }) => {
            const li = document.createElement('li');
            li.textContent = question;
            li.addEventListener('click', () => openModal(section, question, answer));
            ul.appendChild(li);
          });
  
          sectionEl.appendChild(ul);
          container.appendChild(sectionEl);
        }
      });
  
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalAnswer = document.getElementById('modal-answer');
    const closeBtn = document.getElementById('close-modal');
  
    function openModal(section, question, answer) {
      modalTitle.textContent = `${section} — ${question}`;
      modalAnswer.textContent = answer;
      modal.classList.remove('hidden');
    }
  
    closeBtn.addEventListener('click', () => {
      modal.classList.add('hidden');
    });
  
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.add('hidden');
      }
    });
  });
  