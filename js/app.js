const loadData = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/ai/tools');
    const data = await res.json();
    displayData(data.data.tools)
}

const displayData = (data) => {
    const container = document.getElementById('container');
    data.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('card', 'w-full', 'bg-base-100', 'shadow-sm', 'border');
        div.innerHTML = `
        <figure class="p-3 ">
            <img src="${item.image}"
            alt="Shoes"
            class="rounded-xl" style="height:230px" />
        </figure>
        <div class="card-body px-3">
            <h2 class="card-title font-bold">
            Features</h2>
            <ol id="${item.id}">
            </ol>
            <hr class="border-1">
            <div
                class="card-actions flex items-center justify-between">
                <div>
                    <h2
                        class="text-1xl font-bold mb-2">${item.name}</h2>
                    <p><i
                            class="fa-solid fa-calendar-days "></i>
                        11/01/2022</p>
                </div>
                <div>
                    <i
                        class="fa-solid fa-arrow-right text-red-500 cursor-pointer"></i>
                </div>
            </div>
        </div>
        `;
        container.appendChild(div);
        // //features item
        const featuresContainer = document.getElementById(item.id);
        let num = 0;
        item.features.forEach(featuresItem => {
            const li = document.createElement('li');
            li.innerText = `${num += 1} ${'.'} ${featuresItem}`
            featuresContainer.appendChild(li)
        })
    });
}
loadData()