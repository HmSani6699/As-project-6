const loadData = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/ai/tools');
    const data = await res.json();
    displayData(data.data.tools)
}

const displayData = (data) => {
    const container = document.getElementById('container');
    data.forEach(item => {
        // console.log(item);
        const div = document.createElement('div');
        div.classList.add('card', 'w-full', 'bg-base-100', 'shadow-sm', 'border');
        div.innerHTML = `
        <figure class="pt-3 ">
            <img src="camera.png"
            alt="Shoes"
            class="rounded-xl" />
        </figure>
        <div class="card-body">
            <h2 class="card-title">
                Shoes!</h2>
            <p>If a dog chews shoes
                whose shoes does he
                choose?</p>
            <hr class="border-1">
            <div
                class="card-actions flex items-center justify-between">
                <div>
                    <h2
                        class="text-1xl font-bold mb-2">
                        ChatGPT</h2>
                    <p><i
                            class="fa-solid fa-calendar-days "></i>
                        11/01/2022</p>
                </div>
                <div>
                    <i
                        class="fa-solid fa-arrow-right text-red-500"></i>
                </div>
            </div>
        </div>
        `;
        container.appendChild(div)
    });
}
loadData()