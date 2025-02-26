document.addEventListener("DOMContentLoaded", () => {
    const tabs = document.getElementById("tabs");
    const content = document.getElementById("content");
    const newTabButton = document.getElementById("newTab");
    const urlInput = document.getElementById("url");
    const goButton = document.getElementById("go");
    const backButton = document.getElementById("back");
    const forwardButton = document.getElementById("forward");
    const reloadButton = document.getElementById("reload");
    let tabCount = 1;

    function createTab(url = "home.html") {
        tabCount++;
        const tabId = `tab${tabCount}`;
        const tab = document.createElement("div");
        tab.classList.add("tab");
        tab.dataset.id = tabId;
        tab.innerHTML = `New Tab <span class="close">×</span>`;
        tabs.insertBefore(tab, newTabButton);

        const iframe = document.createElement("iframe");
        iframe.id = tabId;
        iframe.src = url;
        iframe.style.display = "none";
        content.appendChild(iframe);

        selectTab(tabId);
        tab.querySelector(".close").addEventListener("click", () => closeTab(tabId));
    }

    function selectTab(tabId) {
        document.querySelectorAll(".tab").forEach(tab => tab.classList.remove("active"));
        document.querySelectorAll("iframe").forEach(iframe => iframe.style.display = "none");
        
        const selectedTab = document.querySelector(`.tab[data-id='${tabId}']`);
        if (selectedTab) selectedTab.classList.add("active");
        
        const selectedIframe = document.getElementById(tabId);
        if (selectedIframe) selectedIframe.style.display = "block";
    }

    function closeTab(tabId) {
        const tab = document.querySelector(`.tab[data-id='${tabId}']`);
        const iframe = document.getElementById(tabId);
        if (tab && iframe) {
            tab.remove();
            iframe.remove();
        }
    }

    newTabButton.addEventListener("click", () => createTab("https://example.com"));

    goButton.addEventListener("click", () => {
        const activeTab = document.querySelector(".tab.active");
        if (activeTab) {
            const iframe = document.getElementById(activeTab.dataset.id);
            iframe.src = urlInput.value;
        }
    });

    backButton.addEventListener("click", () => {
        const activeTab = document.querySelector(".tab.active");
        if (activeTab) document.getElementById(activeTab.dataset.id).contentWindow.history.back();
    });

    forwardButton.addEventListener("click", () => {
        const activeTab = document.querySelector(".tab.active");
        if (activeTab) document.getElementById(activeTab.dataset.id).contentWindow.history.forward();
    });

    reloadButton.addEventListener("click", () => {
        const activeTab = document.querySelector(".tab.active");
        if (activeTab) document.getElementById(activeTab.dataset.id).contentWindow.location.reload();
    });
});
