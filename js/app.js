const loadData = async (daaLimit) => {
    showSpinner(true)
    const res = await fetch('https://openapi.programming-hero.com/api/ai/tools');
    const data = await res.json();
    displayData(data.data.tools, daaLimit);
}

const displayData = (data, daaLimit) => {
    //show all item
    const showAll = document.getElementById('show-all')
    if (daaLimit && data.length > 10) {
        data = data.slice(0, 6);
        showAll.classList.remove('hidden')
    }
    else {
        showAll.classList.add('hidden')
    }
    const container = document.getElementById('container');
    container.innerHTML = '';
    data.forEach(item => {
        // console.log(item)
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
                        ${item.published_in}</p>
                </div>
                <div>
                <label for="my-modal-3" onclick="loadDetailsData(${item.id})"><i
                class="fa-solid fa-arrow-right text-red-500 cursor-pointer"></i></label> 
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
    showSpinner(false)
}

//spinner part
const showSpinner = (isLoading) => {
    const spinnerContainer = document.getElementById('spinnerContainer')
    if (isLoading) {
        spinnerContainer.classList.remove('hidden')
    }
    else {
        spinnerContainer.classList.add('hidden')
    }
}

loadData(6)

// show all data
const showAllData = () => {
    loadData()
}

//load item details data
const loadDetailsData = async (itemId) => {
    let id = 0;
    if (itemId < 10) {
        id = `0${itemId}`
    }
    else {
        id = itemId
    }
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`
    const res = await fetch(url);
    const data = await res.json();
    displayDetails(data.data)
}

const displayDetails = (data) => {
    console.log(data)
    const modalContainer = document.getElementById('modal-card-section');
    modalContainer.innerHTML = `
<div>
    <div
        class="card w-full bg-red-50 shadow-sm border border-red-400">
        <div
            class="card-body p-3">
            <h2 class="card-title">
                ${data.description}
            </h2>
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
                <div>
                    <p class=" font-semibold text-green-500 p-4 text-center"> ${data.pricing[0].price ? data.pricing[0].price : 'free of cost/'} ${data.pricing[0].plan}</p>
                </div>

                <div>
                     <p class=" font-semibold text-red-500 p-4 text-center">${data.pricing[1].price ? data.pricing[1].price : 'free of cost/'} ${data.pricing[1].plan}</p>
                </div>

                <div>
                     <p class=" font-semibold text-amber-500 p-4 text-center">${data.pricing[2].price ? data.pricing[2].price : 'free of cost/'} ${data.pricing[2].plan}</p>
                </div>
            </div> 
            <div class="grid grid-cols-1 lg:grid-cols-2 mt-3">
                <div>
                  <h2 class="text-2xl font-semibold">Features</h2>
                  <ul id="features-container" class="list-disc pl-4"></ul>
                </div>   
                <div>
                   <h2 class="text-2xl font-semibold">Integrations</h2>
                   <ul id="integration-container"></ul>
                </div> 
            </div>  
        </div>
    </div>
</div>
<div>
    <div
        class="card w-full bg-base-100 shadow-sm border">
        <figure class="p-4"><img class="rounded-xl"
                src="${data.image_link[0]}"
                alt="Shoes" style="height:230px" />
        </figure>
        <div
            class="card-body p-0 p-4 text-center">
            <h2
                class="text-2xl font-semibold text-center">
                ${data.input_output_examples[0].input ? data.input_output_examples[0].input : 'Can you give any example?'}
            </h2>
            <p>
            ${data.input_output_examples[0].output ? data.input_output_examples[0].output : 'No! Not Yet! Take a break!!!'}
            </p>
        </div>
    </div>
</div>
`;
    //features part
    const featuresContainer = document.getElementById('features-container');
    if (data.features == {}) {
        const p = document.createElement(p);
        p.innerText = 'No data Found';
        featuresContainer.appendChild(p)
    }
    else {
        for (const item in data.features) {
            const li = document.createElement('li')
            li.innerText = data.features[`${item}`].feature_name;
            featuresContainer.appendChild(li)
        }
    }
}