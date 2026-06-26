const languageToggle = document.getElementById("languageToggle");
const themeToggle = document.getElementById("themeToggle");
const moonIcon = document.getElementById("themeIcon");
const sunIcon = document.getElementById("sunIcon");
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");
const pages = document.querySelectorAll("[data-page]");
const translatableElements = document.querySelectorAll("[data-i18n]");

let currentLanguage = "en";
let currentView = "home";
let switchTimer = null;
const SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbzP1uNMPD4lYNuHjjyF36x39CL3a5yddZ1P93_y-orBsZfOEjHMLjKL23buBLOpof5-/exec";

const translations = {
    en: {
        project: "Project",
        nav: {
            home: "Home",
            project: "Project",
            experience: "Experience",
        },
        home: {
            title: "Do Van Tien",
            intro: "Just a guy looking to be better than yesterday.",
            projects: "Projects",
            cta: "View projects",
            cta2: "Experience",
            time: "Year of Experience",
        },
        project: {
            label: "Project",
            item1: {
                body: "An OTT platform that provides online anime streaming on a website.",
            },
            item2: {
                body: "E-commerce website for selling laundry supplies and clothing care products.",
            },
            item3: {
                title: "Word Chain Vietnamese",
                body: "Vietnamese word-chain game with online multiplayer support.",
            },
            item4: {
                body: "E-commerce website for selling clothing products.",
            },
            item5: {
                body: "All everything you need to know about cocktails.",
            },
        },
        experience: {
            label: "Experience",
            item1: {
                period: "Jun 2024 - Present",
                role: "Customer Support",
                company: "VIET PHYSCODE TECHNOLOGY JOINT STOCK COMPANY",
                list1: "Respond to and resolve issues on customer tickets in the forum and support emails when using the company's products.",
                list2: "Write documentation to guide customers on how to use Wordpress theme and plugins.",
                list3: "Write a request to remove a 1-star rating of the product on the Themeforest page.",
            },
            item2: {
                period: "Jan 2024 - Apr 2024",
                role: "Intern Frontend Developer",
                company: "XUAN THANH PHAT TECHNOLOGY DEVELOPMENT INVESTMENT JOINT STOCK COMPANY",
                list: "Participate in and develop a company website as a team using WordPress.",
            },
            item3: {
                period: "Sep 2023 - Nov 2023",
                role: "Customer Support Intern",
                company: "VIET NAM EHC TECHNOLOGY JOINT STOCK COMPANY",
                list1: "Support the deployment and operation of hospital management software.",
                list2: "Guide and assist doctors in using the system via Zalo and resolve issues during usage.",
            },
        },
    },
    vi: {
        nav: {
            home: "Trang chủ",
            project: "Dự án",
            experience: "Kinh nghiệm",
        },
        home: {
            title: "Đỗ Văn Tiến",
            intro: "Một chàng trai đang cố gắng trở nên tốt hơn ngày hôm qua.",
            cta: "Dự án đã làm",
            projects: "Dự án",
            cta2: "Kinh nghiệm",
            time: "Năm kinh nghiệm",
        },
        project: {
            label: "Dự án",
            item1: {
                body: "Website xem anime trực tuyến.",
            },
            item2: {
                body: "E-commerce website về bán đồ giặt quần áo.",
            },
            item3: {
                title: "Nối từ online",
                body: "Game nối từ tiếng Việt hỗ trợ chơi trực tuyến với nhiều người.",
            },
            item4: {
                body: "E-commerce website về bán quần áo.",
            },
            item5: {
                body: "Tất cả những gì bạn cần biết về cocktail.",
            },
        },
        experience: {
            label: "Kinh nghiệm",
            item1: {
                period: "6/2024 - Hiện tại",
                role: "Chăm sóc khách hàng",
                company: "CÔNG TY CỔ PHẦN CÔNG NGHỆ PHYSCODE VIỆT",
                list1: "Trả lời và giải quyết vấn đề trên ticket của khách hàng ở trên forum và email hỗ trợ khi sử dụng sản phẩm công ty.",
                list2: "Viết tài liệu hướng dẫn khách hàng cách sử dụng chủ đề và plugin Wordpress.",
                list3: "Viết yêu cầu để xóa đánh giá 1 sao của sản phẩm trên trang Themeforest.",
            },
            item2: {
                period: "1/2024 - 4/2024",
                role: "Thực tập sinh Frontend Developer",
                company: "CÔNG TY CỔ PHẦN ĐẦU TƯ PHÁT TRIỂN CÔNG NGHỆ XUÂN THÀNH PHÁT",
                list: "Tham gia và phối hợp cùng với mọi người xây dựng website bằng Wordpress.",
            },
            item3: {
                period: "9/2023 - 11/2023",
                role: "Thực tập sinh Chăm sóc Khách hàng",
                company: "CÔNG TY CỔ PHẦN CÔNG NGHỆ EHC VIỆT",
                list1: "Hỗ trợ triển khai và vận hành phần mềm quản lý bệnh viện.",
                list2: "Hướng dẫn và hỗ trợ các bác sĩ sử dụng hệ thống HIS qua Zalo và giải quyết các vấn đề trong quá trình sử dụng.",
            },
        },
    },
};

const getTranslation = (key, language) => {
    return key.split(".").reduce((value, item) => {
        return value ? value[item] : null;
    }, translations[language]);
};

const translatePage = (language) => {
    translatableElements.forEach((element) => {
        const text = getTranslation(element.dataset.i18n, language);

        if (text) {
            element.textContent = text;
        }
    });

    document.documentElement.lang = language;
    languageToggle.textContent = language.toUpperCase();
};

const setActiveLink = (viewName) => {
    document.querySelectorAll(".nav-link").forEach((link) => {
        const isActive = link.dataset.view === viewName;
        link.classList.toggle("text-[#00ADB5]", isActive);
        link.classList.toggle("dark:text-[#E6E7EE]", isActive);
    });
};

const showPage = (viewName) => {
    if (viewName === currentView) {
        setActiveLink(viewName);
        return;
    }

    window.clearTimeout(switchTimer);

    const currentPage = document.querySelector(`[data-page="${currentView}"]`);
    const nextPage = document.querySelector(`[data-page="${viewName}"]`);

    if (!nextPage) {
        return;
    }

    if (currentPage) {
        currentPage.classList.add("is-leaving");
    }

    switchTimer = window.setTimeout(() => {
        pages.forEach((page) => {
            page.classList.toggle("hidden", page !== nextPage);
            page.classList.remove("is-leaving", "is-entering");
        });

        nextPage.classList.add("is-entering");
        currentView = viewName;

        window.requestAnimationFrame(() => {
            nextPage.classList.remove("is-entering");
        });
    }, 180);

    setActiveLink(viewName);

    if (!mobileMenu.classList.contains("hidden")) {
        mobileMenu.classList.add("hidden");
        menuToggle.setAttribute("aria-expanded", "false");
    }
};

document.addEventListener("click", (event) => {
    const link = event.target.closest("[data-view]");

    if (!link) {
        return;
    }

    event.preventDefault();
    showPage(link.dataset.view);
});

languageToggle.addEventListener("click", () => {
    currentLanguage = currentLanguage === "en" ? "vi" : "en";
    translatePage(currentLanguage);
});

themeToggle.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark");
    const isDark = document.documentElement.classList.contains("dark");

    moonIcon.classList.toggle("hidden", isDark);
    sunIcon.classList.toggle("hidden", !isDark);
});

menuToggle.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.toggle("hidden") === false;
    menuToggle.setAttribute("aria-expanded", String(isOpen));
});

pages.forEach((page) => {
    page.classList.toggle("hidden", page.dataset.page !== currentView);
});
setActiveLink(currentView);
translatePage(currentLanguage);
moonIcon.classList.toggle("hidden", document.documentElement.classList.contains("dark"));
sunIcon.classList.toggle("hidden", !document.documentElement.classList.contains("dark"));

fetch(SCRIPT_URL)
    .then((res) => res.json())
    .then((data) => {
        document.getElementById("view-count").textContent = data.views;
    })
    .catch(console.error);
