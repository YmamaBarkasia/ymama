   // التنقل بين الأقسام
    function showSection(id, el) {
      document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
      document.getElementById(id).classList.add('active');

      document.querySelectorAll('.sidebar li').forEach(li => li.classList.remove('active'));
      el.classList.add('active');
    }

    // تحديد الحالة حسب العلامة
    document.querySelectorAll('tbody tr').forEach(row => {
      const marks = row.querySelectorAll('.mark');
      const statuses = row.querySelectorAll('.status');

      marks.forEach((markCell, index) => {
        const mark = parseFloat(markCell.textContent);
        const statusCell = statuses[index];

        if (!isNaN(mark)) {
          if (mark >= 40) {
            statusCell.innerHTML = '<i class="fas fa-check pass"></i>';
          } else {
            statusCell.innerHTML = '<i class="fas fa-times fail"></i>';
          }
        } else {
          statusCell.textContent = '-';
        }
      });
    });

  function toggleDarkMode() {
    const body = document.body;
    const icon = document.getElementById('darkIcon');
    body.classList.toggle('dark-mode');

    if (body.classList.contains('dark-mode')) {
      icon.classList.replace('fa-moon', 'fa-sun');
      localStorage.setItem('mode', 'dark');
    } else {
      icon.classList.replace('fa-sun', 'fa-moon');
      localStorage.setItem('mode', 'light');
    }
  }

  // تطبيق الوضع المحفوظ
  window.onload = () => {
    const mode = localStorage.getItem('mode');
    const body = document.body;
    const icon = document.getElementById('darkIcon');
    if (mode === 'dark') {
      body.classList.add('dark-mode');
      icon.classList.replace('fa-moon', 'fa-sun');
    }
  };
  // اختصارات الأسهم للتنقل بين الأقسام
    const menuItems = document.querySelectorAll('.sidebar li');
    let currentIndex = 0;
    document.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') {
        currentIndex = (currentIndex + 1) % menuItems.length;
        menuItems[currentIndex].click();
      } else if (e.key === 'ArrowRight') {
        currentIndex = (currentIndex - 1 + menuItems.length) % menuItems.length;
        menuItems[currentIndex].click();
      }
    });

    // معاينة الملفات المرفوعة
    document.getElementById('assignmentForm').addEventListener('submit', function (e) {
      e.preventDefault();
      const fileInput = document.getElementById('fileInput');
      const file = fileInput.files[0];
      const preview = document.getElementById('filePreview');
      preview.innerHTML = '';

      if (file) {
        const fileType = file.type;
        if (fileType.startsWith('image/')) {
          const img = document.createElement('img');
          img.src = URL.createObjectURL(file);
          img.className = 'img-fluid';
          img.onload = () => URL.revokeObjectURL(img.src);
          preview.appendChild(img);
        } else if (fileType === 'application/pdf') {
          const link = document.createElement('a');
          link.href = URL.createObjectURL(file);
          link.target = '_blank';
          link.textContent = 'عرض الملف (PDF)';
          preview.appendChild(link);
        } else {
          preview.textContent = 'صيغة الملف غير مدعومة للمعاينة.';
        }
      }
    });
