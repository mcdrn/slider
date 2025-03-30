

document.addEventListener("DOMContentLoaded", function () {
    const sliderWrapper = document.querySelector(".slider-wrapper");
    const slides = document.querySelectorAll(".slide");
    const progressBar = document.querySelector(".progress-bar");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");

    let currentIndex = 0;
    const totalSlides = slides.length;
    const slideWidth = slides[0].offsetWidth + 20; // スライド幅 + gap
    const transitionSpeed = 1.5;
    const intervalSpeed = 3000;
    let autoSlide;

    // スライドを複製して無限ループ
    slides.forEach(slide => {
        const clone = slide.cloneNode(true);
        sliderWrapper.appendChild(clone);
    });

    function updateProgressBar() {
        let progressPercentage = ((currentIndex % totalSlides) / (totalSlides - 1)) * 100;
        progressBar.style.width = `${progressPercentage}%`;
    }

    function moveSlide(direction) {
        if (direction === "next") {
            currentIndex++;
        } else {
            currentIndex--;
        }

        if (currentIndex < 0) {
            currentIndex = totalSlides - 1;
        }

        sliderWrapper.style.transition = `transform ${transitionSpeed}s ease-in-out`;
        sliderWrapper.style.transform = `translateX(${-currentIndex * slideWidth}px)`;

        updateProgressBar();

        setTimeout(() => {
            if (currentIndex >= totalSlides) {
                sliderWrapper.style.transition = "none";
                sliderWrapper.style.transform = `translateX(0)`;
                currentIndex = 0;
                updateProgressBar();
            }
        }, transitionSpeed * 1000);
    }

    function startAutoSlide() {
        autoSlide = setInterval(() => moveSlide("next"), intervalSpeed);
    }

    function stopAutoSlide() {
        clearInterval(autoSlide);
    }

    // 自動スライド開始
    startAutoSlide();

    // ボタンイベント
    nextBtn.addEventListener("click", () => {
        stopAutoSlide();
        moveSlide("next");
        startAutoSlide();
    });

    prevBtn.addEventListener("click", () => {
        stopAutoSlide();
        moveSlide("prev");
        startAutoSlide();
    });
});
