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

  const bookingEndpoints = [
    document.querySelector(".hero"),
    document.querySelector("#info"),
    document.querySelector(".footer")
  ];
  const visibleEndpoints = new Set();
  const booking = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.intersectionRatio >= 0.08) {
        visibleEndpoints.add(entry.target);
      } else {
        visibleEndpoints.delete(entry.target);
      }
    }
    document.body.classList.toggle("show-mobile-book", visibleEndpoints.size === 0);
  }, { threshold: 0.08 });
  bookingEndpoints.forEach((element) => booking.observe(element));
}

