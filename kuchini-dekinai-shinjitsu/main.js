if ("IntersectionObserver" in window) {
  document.documentElement.classList.add("motion");
  const reveals = new IntersectionObserver((entries, observer) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach((element) => reveals.observe(element));

  // The floating button is hidden only while another booking button is on screen.
  const bookingEndpoints = [
    document.querySelector(".hero .button"),
    document.querySelector(".booking-button")
  ].filter(Boolean);
  const visibleEndpoints = new Set();
  const booking = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.intersectionRatio >= 0.5) {
        visibleEndpoints.add(entry.target);
      } else {
        visibleEndpoints.delete(entry.target);
      }
    }
    document.body.classList.toggle("show-mobile-book", visibleEndpoints.size === 0);
  }, { threshold: 0.5 });
  bookingEndpoints.forEach((element) => booking.observe(element));
}

