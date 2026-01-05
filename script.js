document.addEventListener('DOMContentLoaded', function() {
    // Form submission handling
    const applicationForm = document.getElementById('application-form');
    const paymentSuccess = document.getElementById('payment-success');
    const paymentProofInput = document.getElementById('payment-proof');
    const submitButton = document.querySelector('.btn-apply');
    
    // Initially hide the submit button
    if (submitButton) {
        submitButton.style.display = 'none';
    }
    
    // Show submit button only after payment proof is uploaded
    if (paymentProofInput) {
        paymentProofInput.addEventListener('change', function(e) {
            if (e.target.files.length > 0) {
                // Show the submit button when a file is selected
                if (submitButton) {
                    submitButton.style.display = 'block';
                }
            } else {
                // Hide the submit button if no file is selected
                if (submitButton) {
                    submitButton.style.display = 'none';
                }
            }
        });
    }
    
    // Create error message element
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message hidden';
    errorMessage.style.color = '#ff3860';
    errorMessage.style.marginTop = '15px';
    errorMessage.style.padding = '10px';
    errorMessage.style.backgroundColor = '#fff0f0';
    errorMessage.style.borderRadius = '5px';
    errorMessage.style.textAlign = 'center';
    
    // Add error message element to the form
    if (applicationForm) {
        applicationForm.appendChild(errorMessage);
        
        applicationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Hide any previous error message
            errorMessage.classList.add('hidden');
            
            // Show loading indicator
            const loadingElement = document.createElement('div');
            loadingElement.className = 'loading';
            loadingElement.innerHTML = `
                <div class="loading-spinner"></div>
                <p>Processing your application...</p>
            `;
            applicationForm.appendChild(loadingElement);
            loadingElement.style.display = 'block';
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const why = document.getElementById('why').value;
            
            // Process the form submission directly without PayPal API
            setTimeout(() => {
                // Remove loading indicator
                loadingElement.remove();
                
                // Hide form and show success message
                applicationForm.style.display = 'none';
                paymentSuccess.classList.remove('hidden');
    
                // Add auto-hide functionality
                setTimeout(() => {
                    // Hide success message
                    paymentSuccess.classList.add('hidden');
                    // Show form again
                    applicationForm.style.display = 'block';
                    // Reset form fields
                    applicationForm.reset();
                    // Also reset the file input and hide submit button
                    if (submitButton) {
                        submitButton.style.display = 'none';
                    }
                }, 5000); // 5000ms = 5 seconds delay
            }, 2000);
        });
    }
    
    // Simulate payment processing (in a real app, this would connect to PayPal API)
    function simulatePayment(name, email, paypalEmail) {
        return new Promise((resolve, reject) => {
            // Simulate API call delay
            setTimeout(() => {
                // For demo purposes, always succeed
                resolve({
                    success: true,
                    transactionId: 'DEMO-' + Math.random().toString(36).substr(2, 9).toUpperCase()
                });
            }, 2000);
        });
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Create placeholder images with text
    document.querySelectorAll('.placeholder-img').forEach(img => {
        if (!img.src || img.src.includes('placeholder')) {
            img.textContent = 'MrBeast Challenge Image';
        }
    });
    
    // Testimonial Carousel
    const testimonials = [
      {
        quote:
          "Being in a MrBeast challenge changed my life! The experience was incredible and the prize money helped me start my own business.",
        author: "Dexter J.",
      },
      {
        quote:
          "I never thought I'd be selected, but I took a chance and it paid off! The challenge was tough but so worth it.",
        author: "Jeff Allen.",
      },
      {
        quote:
          "Winning the challenge was surreal! The production quality was amazing and the team treated us like family.",
        author: "Michael Cruz.",
      },
      {
        quote:
          "The challenge pushed me to my limits, but the support from MrBeast and his team made it all worthwhile.",
        author: "Tyler Conklin.",
      },
      {
        quote:
          "Life-changing doesn't even begin to describe it. The opportunities after winning have been incredible.",
        author: "Keith Geller.",
      },
    ];
    
    // Create testimonial slides
    const track = document.querySelector('.carousel-track');
    if (track) {
        track.innerHTML = testimonials.map(testimonial => `
            <div class="slide">
                <blockquote>"${testimonial.quote}"</blockquote>
                <cite>- ${testimonial.author}</cite>
            </div>
        `).join('');
    
        const slides = Array.from(track.children);
        const nextButton = document.querySelector('.next-btn');
        const prevButton = document.querySelector('.prev-btn');
        const dotsContainer = document.querySelector('.carousel-dots');
        
        if (track && slides.length) {
            // Set up the slides
            const slideWidth = slides[0].getBoundingClientRect().width;
            
            const setSlidePosition = (slide, index) => {
                slide.style.left = slideWidth * index + 'px';
            };
            
            slides.forEach(setSlidePosition);
            
            // Create the dots
            slides.forEach((_, index) => {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                if (index === 0) dot.classList.add('active');
                dotsContainer.appendChild(dot);
            });
            
            const dots = Array.from(dotsContainer.children);
            
            // Move to slide function
            const moveToSlide = (track, currentSlide, targetSlide) => {
                track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
                currentSlide.classList.remove('current-slide');
                targetSlide.classList.add('current-slide');
            };
            
            // Update dots
            const updateDots = (currentDot, targetDot) => {
                currentDot.classList.remove('active');
                targetDot.classList.add('active');
            };
            
            // Hide/show arrows
            const hideShowArrows = (slides, prevButton, nextButton, targetIndex) => {
                if (targetIndex === 0) {
                    prevButton.style.opacity = '0.5';
                    nextButton.style.opacity = '1';
                } else if (targetIndex === slides.length - 1) {
                    prevButton.style.opacity = '1';
                    nextButton.style.opacity = '0.5';
                } else {
                    prevButton.style.opacity = '1';
                    nextButton.style.opacity = '1';
                }
            };
            
            // Set first slide as current
            slides[0].classList.add('current-slide');
            
            // Click on prev button
            prevButton.addEventListener('click', e => {
                const currentSlide = track.querySelector('.current-slide');
                const prevSlide = currentSlide.previousElementSibling || slides[slides.length - 1];
                const currentDot = dotsContainer.querySelector('.active');
                const prevDot = currentDot.previousElementSibling || dots[dots.length - 1];
                const prevIndex = slides.findIndex(slide => slide === prevSlide);
                
                moveToSlide(track, currentSlide, prevSlide);
                updateDots(currentDot, prevDot);
                hideShowArrows(slides, prevButton, nextButton, prevIndex);
            });
            
            // Click on next button
            nextButton.addEventListener('click', e => {
                const currentSlide = track.querySelector('.current-slide');
                const nextSlide = currentSlide.nextElementSibling || slides[0];
                const currentDot = dotsContainer.querySelector('.active');
                const nextDot = currentDot.nextElementSibling || dots[0];
                const nextIndex = slides.findIndex(slide => slide === nextSlide);
                
                moveToSlide(track, currentSlide, nextSlide);
                updateDots(currentDot, nextDot);
                hideShowArrows(slides, prevButton, nextButton, nextIndex);
            });
            
            // Click on dots
            dotsContainer.addEventListener('click', e => {
                const targetDot = e.target.closest('div.dot');
                
                if (!targetDot) return;
                
                const currentSlide = track.querySelector('.current-slide');
                const currentDot = dotsContainer.querySelector('.active');
                const targetIndex = dots.findIndex(dot => dot === targetDot);
                const targetSlide = slides[targetIndex];
                
                moveToSlide(track, currentSlide, targetSlide);
                updateDots(currentDot, targetDot);
                hideShowArrows(slides, prevButton, nextButton, targetIndex);
            });
            
            // Auto slide every 5 seconds
            let slideInterval = setInterval(() => {
                const currentSlide = track.querySelector('.current-slide');
                const nextSlide = currentSlide.nextElementSibling || slides[0];
                const currentDot = dotsContainer.querySelector('.active');
                const nextDot = currentDot.nextElementSibling || dots[0];
                const nextIndex = slides.findIndex(slide => slide === nextSlide);
                
                moveToSlide(track, currentSlide, nextSlide);
                updateDots(currentDot, nextDot);
                hideShowArrows(slides, prevButton, nextButton, nextIndex);
            }, 5000);
            
            // Pause auto slide on hover
            track.addEventListener('mouseenter', () => {
                clearInterval(slideInterval);
            });
            
            // Resume auto slide on mouse leave
            track.addEventListener('mouseleave', () => {
                slideInterval = setInterval(() => {
                    const currentSlide = track.querySelector('.current-slide');
                    const nextSlide = currentSlide.nextElementSibling || slides[0];
                    const currentDot = dotsContainer.querySelector('.active');
                    const nextDot = currentDot.nextElementSibling || dots[0];
                    const nextIndex = slides.findIndex(slide => slide === nextSlide);
                    
                    moveToSlide(track, currentSlide, nextSlide);
                    updateDots(currentDot, nextDot);
                    hideShowArrows(slides, prevButton, nextButton, nextIndex);
                }, 5000);
            });
        }
    }
    
    // Make carousel responsive
    function updateCarouselForMobile() {
        if (window.innerWidth < 768) {
            // Mobile styles
            track.style.width = '100%';
            slides.forEach(slide => {
                slide.style.width = '100%';
                slide.style.padding = '20px';
            });
        } else {
            // Desktop styles
            track.style.width = `${slides.length * 100}%`;
            slides.forEach(slide => {
                slide.style.width = `${100 / slides.length}%`;
            });
        }
    }
    
    window.addEventListener('resize', updateCarouselForMobile);
    updateCarouselForMobile();
});


// Countdown Timer
const countdown = () => {
    const countDate = new Date('December 31, 2027 00:00:00').getTime(); // Set your target date here
    const now = new Date().getTime();
    const gap = countDate - now;

    // How time works
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Calculate the remaining time
    const textDay = Math.floor(gap / day);
    const textHour = Math.floor((gap % day) / hour);
    const textMinute = Math.floor((gap % hour) / minute);
    const textSecond = Math.floor((gap % minute) / second);

    // Update the HTML elements
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');

    if (daysElement && hoursElement && minutesElement && secondsElement) {
        daysElement.innerText = textDay < 10 ? '0' + textDay : textDay;
        hoursElement.innerText = textHour < 10 ? '0' + textHour : textHour;
        minutesElement.innerText = textMinute < 10 ? '0' + textMinute : textMinute;
        secondsElement.innerText = textSecond < 10 ? '0' + textSecond : textSecond;
    }

    if (gap < 0) {
        clearInterval(countdownInterval);
        const countdownDiv = document.getElementById('countdown');
        if (countdownDiv) {
            countdownDiv.innerHTML = '<h2>Challenge Has Started!</h2>';
        }
    }
};

// Run the countdown every second
const countdownInterval = setInterval(countdown, 1000);
countdown(); // Initial call to display immediately