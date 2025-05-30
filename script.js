const countdownEl = document.getElementById('countdown');
const birthdayMessage = document.getElementById('birthdayMessage');
const proposal = document.getElementById('proposal');
const response = document.getElementById('response');



function startCountdown() {
  let hour = 11;
  let minute = 59;
  let second = 50;

  const interval = setInterval(() => {
    const displayHour = hour.toString().padStart(2, '0');
    const displayMinute = minute.toString().padStart(2, '0');
    const displaySecond = second.toString().padStart(2, '0');
    countdownEl.textContent = `${displayHour}:${displayMinute}:${displaySecond}`;

    if (hour === 12 && minute === 0 && second === 0) {
      clearInterval(interval);
      countdownEl.classList.add('hidden');
      showBirthdayAnimation();
      return;
    }

    second++;
    if (second > 59) {
      second = 0;
      minute++;
      if (minute > 59) {
        minute = 0;
        hour++;
      }
    }
  }, 1000);
}

function showBirthdayAnimation() {
  birthdayMessage.classList.remove('hidden');

  gsap.from("#happy", { x: -500, opacity: 0, duration: 1 });
  gsap.from("#birthday", { x: 500, opacity: 0, duration: 1, delay: 1 });
  gsap.from("#maliha", { scale: 0, opacity: 0, duration: 1, delay: 2 });

  setTimeout(() => {
    birthdayMessage.classList.add('hidden');
    showProposal();
  }, 5000);
}

function logUserChoice(choice) {
  const device = navigator.userAgent;
  console.log(`User clicked "${choice}" on device: ${device}`);
}

function showProposal() {


  // Remove hidden and restart animation for proposal
  proposal.classList.remove('hidden');
  proposal.style.animation = 'none';
  proposal.offsetHeight; // trigger reflow
  proposal.style.animation = '';

  // Button event listeners (once)
    document.getElementById('yesBtn').onclick = function() {
      if (typeof gtag === "function") {
        gtag('event', 'proposal_response', {
          'event_category': 'Button',
          'event_label': 'Yes',
          'device_info': navigator.userAgent
          
        });
      }
      logUserChoice('Yes');
      document.getElementById('proposal').classList.add('hidden');
      document.getElementById('response').innerHTML = "<h2>🥰 You just made me the happiest person alive. Thank you for saying yes—not just to me, but to everything that’s ahead. I always try to hold your heart with care, to walk beside you in every season, and to make this journey full of love, laughter, and meaning.It’s me, Rayhan, who is waiting for your message...</h2>";
      document.getElementById('response').classList.remove('hidden');
    };

    document.getElementById('noBtn').onclick = function() {
      if (typeof gtag === "function") {
        gtag('event', 'proposal_response', {
          'event_category': 'Button',
          'event_label': 'No',
          'device_info': navigator.userAgent,
          'debug_mode': true
        });
      }
      logUserChoice('No');
      document.getElementById('proposal').classList.add('hidden');
      document.getElementById('response').innerHTML = "<h2>💔 It's okay... just remember: the strongest hearts still care in silence. It’s me, Rayhan, a whisper in the wind you’ll never quite forget.Though our stars may not align this time,I’ll carry your light gently in my heart,A silent melody that never fades...</h2>";
      document.getElementById('response').classList.remove('hidden');
    };
}

window.onload = function() {
  document.getElementById('startBtn').addEventListener('click', function() {
    document.getElementById('startBtn').style.display = 'none';
    countdownEl.classList.remove('hidden');
    startCountdown();
  });
};
