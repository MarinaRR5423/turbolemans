import './style.css'

const navToggle = document.querySelector('#nav-toggle')
const mainNav = document.querySelector('#main-nav')

navToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('is-open')
  navToggle.setAttribute('aria-expanded', String(isOpen))
})

mainNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('is-open')
    navToggle.setAttribute('aria-expanded', 'false')
  })
})

// reveal-on-scroll
const revealEls = document.querySelectorAll('.reveal')
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
        revealObserver.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
)
revealEls.forEach((el) => revealObserver.observe(el))

// draw the boost-gauge tick marks
const ticksGroup = document.querySelector('.gauge-ticks')
if (ticksGroup) {
  const cx = 280
  const cy = 280
  const rOuter = 248
  const svgNS = 'http://www.w3.org/2000/svg'

  for (let deg = 0; deg < 360; deg += 10) {
    const isMajor = deg % 30 === 0
    const rInner = isMajor ? rOuter - 16 : rOuter - 9
    const rad = (deg - 90) * (Math.PI / 180)
    const x1 = cx + rInner * Math.cos(rad)
    const y1 = cy + rInner * Math.sin(rad)
    const x2 = cx + rOuter * Math.cos(rad)
    const y2 = cy + rOuter * Math.sin(rad)

    const line = document.createElementNS(svgNS, 'line')
    line.setAttribute('x1', x1.toFixed(1))
    line.setAttribute('y1', y1.toFixed(1))
    line.setAttribute('x2', x2.toFixed(1))
    line.setAttribute('y2', y2.toFixed(1))
    line.setAttribute('stroke', 'currentColor')
    line.setAttribute('stroke-width', isMajor ? '2' : '1')
    line.setAttribute('opacity', isMajor ? '0.55' : '0.25')
    ticksGroup.appendChild(line)
  }
}
