// تفاعلات الموقع
document.addEventListener('DOMContentLoaded', function() {
    
    // تفعيل قائمة الموبايل
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
            navMenu.style.flexDirection = 'column';
            navMenu.style.position = 'absolute';
            navMenu.style.top = '60px';
            navMenu.style.right = '0';
            navMenu.style.backgroundColor = '#1a237e';
            navMenu.style.width = '100%';
            navMenu.style.padding = '1rem';
            navMenu.style.zIndex = '1000';
        });
    }
    
    // حفظ تقدم قوائم التحقق
    const checkboxes = document.querySelectorAll('.checklist-section input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const checklistName = this.closest('.checklist').querySelector('h4').textContent;
            const progress = document.querySelectorAll('.checklist-section input[type="checkbox"]:checked').length;
            const total = checkboxes.length;
            
            console.log(`تقدم قائمة ${checklistName}: ${progress}/${total}`);
            
            // حفظ التقدم في LocalStorage
            localStorage.setItem(checklistName, JSON.stringify({
                checked: progress,
                total: total,
                timestamp: new Date().toISOString()
            }));
        });
    });
    
    // تحميل التقدم المحفوظ
    function loadChecklistProgress() {
        const checklists = document.querySelectorAll('.checklist');
        checklists.forEach(checklist => {
            const checklistName = checklist.querySelector('h4').textContent;
            const savedProgress = localStorage.getItem(checklistName);
            
            if (savedProgress) {
                const progress = JSON.parse(savedProgress);
                console.log(`التقدم المحفوظ لـ ${checklistName}: ${progress.checked}/${progress.total}`);
            }
        });
    }
    
    loadChecklistProgress();
    
    // البحث في المحتوى
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = '🔍 بحث في المنصة...';
    searchInput.style.cssText = `
        padding: 10px 15px;
        margin: 10px auto;
        display: block;
        width: 80%;
        max-width: 500px;
        border: 2px solid #1a237e;
        border-radius: 25px;
        font-size: 16px;
    `;
    
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        mainContent.insertBefore(searchInput, mainContent.firstChild);
        
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const sections = document.querySelectorAll('.content-block');
            
            sections.forEach(section => {
                const text = section.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    section.style.display = 'block';
                } else {
                    section.style.display = 'none';
                }
            });
        });
    }
    
    // طباعة قوائم التحقق
    const printButton = document.createElement('button');
    printButton.textContent = '🖨️ طباعة قائمة الفحص';
    printButton.style.cssText = `
        padding: 10px 20px;
        margin: 20px auto;
        display: block;
        background-color: #1a237e;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;
    `;
    
    const checklistSection = document.querySelector('.checklist');
    if (checklistSection) {
        checklistSection.insertBefore(printButton, checklistSection.firstChild);
        
        printButton.addEventListener('click', function() {
            window.print();
        });
    }
    
    // عدّاد مرات الدخول
    let visitCount = localStorage.getItem('visitCount') || 0;
    visitCount = parseInt(visitCount) + 1;
    localStorage.setItem('visitCount', visitCount);
    
    console.log(`عدد زيارات المنصة: ${visitCount}`);
    
    // تاريخ آخر تحديث
    const lastUpdate = new Date('2024-01-15');
    const today = new Date();
    const daysSinceUpdate = Math.floor((today - lastUpdate) / (1000 * 60 * 60 * 24));
    
    console.log(`آخر تحديث للمحتوى: قبل ${daysSinceUpdate} يوم`);
    
    // تفاعل مع أزرار المصادر
    const referenceLinks = document.querySelectorAll('.reference-card a');
    referenceLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const sourceName = this.closest('.reference-card').querySelector('h3').textContent;
            console.log(`تم زيارة مصدر خارجي: ${sourceName}`);
        });
    });
});

// وظيفة لإنشاء تقرير PDF (يمكن توسيعها)
function generateReport() {
    const reportData = {
        date: new Date().toISOString(),
        projectName: prompt('أدخل اسم المشروع:'),
        inspector: prompt('أدخل اسم المفتش:'),
        scaffoldingType: prompt('نوع السقالة:'),
        height: prompt('ارتفاع السقالة (متر):'),
        findings: prompt('الملاحظات:')
    };
    
    console.log('تقرير الفحص:', reportData);
    
    // هنا يمكن إضافة كود لتوليد PDF باستخدام مكتبة jsPDF
    alert('تم إنشاء التقرير بنجاح!');
    
    return reportData;
}