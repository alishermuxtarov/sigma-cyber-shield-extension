const body = document.querySelector("body");

if (body) {
    chrome.storage.local.get('hosts')
        .then(({hosts}) => {
            let shouldBlock = false
            message = "Сайт содержит запрешенный контент!";

            if (hosts.find((host) => {
                return window.location.href.includes(host)
            })) {
                message = "Caйт запрещен для посещения"
                shouldBlock = true
            } else {
                hosts.find((host) => {
                    return document.body.innerHTML.includes(host)
                })
            }

            if (shouldBlock) {
                const badge = document.createElement("p");
                badge.textContent = "Сайт содержит запрешенный контент!";
                badge.style.background = 'red';
                badge.style.color = 'white';
                badge.style.padding = '20px 10px';
                badge.style.textAlign = 'center';
                badge.style.position = 'fixed';
                badge.style.top = '0';
                badge.style.right = '0';
                badge.style.left = '0';
                badge.style.zIndex = '9999';

                body.prepend(badge);
            }
        })
}