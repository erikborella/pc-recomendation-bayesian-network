function showLoadingSpinner() {
    document.getElementById('loading-recommendation-spinner')
        .className = null;
}

function hideLoadingSpinner() {
    document.getElementById('loading-recommendation-spinner')
        .className = 'hide';
}

function showRecommendationCards() {
    document.getElementById('recommendation-cards')
        .className = null;
}

function getUsesSelected() {
    const selectedUses = [...document.querySelectorAll('input[name="usageGroup"]')]
        .find(e => !!e.checked && e.checked)
        .value;

    return selectedUses;
}

function getSelectedPrice() {
    const selectedPriceElement = [...document.querySelectorAll('input[name="priceGroup"]')]
        .find(e => !!e.checked && e.checked);

    if (selectedPriceElement != null) {
        return selectedPriceElement.value;
    }

    return null;
}

function getRecommendation(request, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:5000/recommendation/");
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.send(JSON.stringify(request));
    xhr.responseText = 'json';

    xhr.onload = () => {
        const data = xhr.response;
        callback(data);
    }
}

function translateUsages(usage) {
    switch (usage) {
        case 'Low':
            return 'Baixo';
        case 'Medium':
            return "Médio";
        case "High":
            return "Alto";
    }

    return undefined;
}

function createCpuCardInfo(cpu, cpuUsage) {
    const cpuCardInfo = {
        'name': '',
        'imgSrc': '',
        'link': ''
    };

    switch (cpu) {
        case 'Intel_I9_11900K':
            cpuCardInfo.name = 'INTEL CORE I9-11900K';
            cpuCardInfo.imgSrc = 'https://m.media-amazon.com/images/I/71diouNMRHL.jpg';
            cpuCardInfo.link = 'https://www.amazon.com.br/INTEL-I9-11900K-3-5GHZ-LGA1200-16MB/dp/B08X6PPTTH?th=1';
            break;

        case 'AMD_Ryzen_7_5800X':
            cpuCardInfo.name = 'AMD Ryzen 7 5800X';
            cpuCardInfo.imgSrc = 'https://hotsite.pichau.com.br/descricao/pc/CDN%20PROVSRIO/5700G.png';
            cpuCardInfo.link = 'https://www.amazon.com.br/Processador-AM4-Ryzen-5800X-100-100000063WOF/dp/B0815XFSGK';
            break;

        case 'Intel_I7_101700K':
            cpuCardInfo.name = 'INTEL CORE I7-10700KF';
            cpuCardInfo.imgSrc = 'https://m.media-amazon.com/images/I/51EtUSUQeJS._AC_.jpg';
            cpuCardInfo.link = 'https://www.kabum.com.br/produto/112997/processador-intel-core-i7-10700kf-3-8ghz-5-1ghz-max-turbo-cache-16mb-lga-1200-bx8070110700kf';
            break;

        case 'Intel_I5_11600K':
            cpuCardInfo.name = 'INTEL CORE I5-11600K';
            cpuCardInfo.imgSrc = 'https://img.terabyteshop.com.br/produto/g/processador-intel-core-i5-11600k-39ghz-50ghz-turbo-11-geracao-6-cores-12-threads-lga-1200-bx8070811600k_117839.jpg';
            cpuCardInfo.link = 'https://www.amazon.com.br/PROCESSADOR-I5-11600K-NUCLEOS-THREADS-BX8070811600K/dp/B08TX3M96F';
            break;

        case 'Intel_I3_10100':
            cpuCardInfo.name = 'INTEL CORE I3-10100F';
            cpuCardInfo.imgSrc = 'https://images.kabum.com.br/produtos/fotos/129960/processador-intel-core-i3-10100f-cache-6mb-4-30-ghz-lga-1200-i3-10100f_1603394030_original.jpg';
            cpuCardInfo.link = 'https://www.kabum.com.br/produto/129960/processador-intel-core-i3-10100f-3-6ghz-4-3ghz-max-boost-cache-6mb-quad-core-8-threads-lga-1200-bx8070110100f';
            break;
    }

    document.getElementById('cpu_img')
        .src = cpuCardInfo.imgSrc;

    document.getElementById('cpu_name')
        .textContent = cpuCardInfo.name;

    document.getElementById('cpu_link')
        .href = cpuCardInfo.link;

    document.getElementById('cpu_usage')
        .textContent = cpuUsage;
}

function createGPUCardInfo(gpu, gpuUsage) {
    const gpuCardInfo = {
        'name': '',
        'imgSrc': '',
        'link': ''
    };

    switch (gpu) {
        case 'NVIDEA_RTX_3090':
            gpuCardInfo.name = 'NVIDIA RTX 3090';
            gpuCardInfo.link = 'https://www.amazon.com.br/Placa-Video-RTX-3090-Nvidia/dp/B08HR6ZBYJ';
            gpuCardInfo.imgSrc = 'https://m.media-amazon.com/images/I/61AZBIL4+2L.jpg';
            break;

        case 'AMD_RX_6800XT':
            gpuCardInfo.name = 'AMD RX 6800XT';
            gpuCardInfo.link = 'https://www.amazon.com.br/Placa-V%C3%ADdeo-ASUS-Radeon-TUF-RX6800XT-O16G-GAMING/dp/B08QVRZH3C';
            gpuCardInfo.imgSrc = 'https://m.media-amazon.com/images/I/61or+SFoTOL._AC_UF894,1000_QL80_.jpg';
            break;

        case 'NVIDIA_GTX_1660':
            gpuCardInfo.name = 'NVIDIA GTX 1660';
            gpuCardInfo.link = 'https://www.amazon.com.br/Placa-NVIDIA-GeForce-GV-N166SOC-6GD-GIGABYTE/dp/B07ZPM2BVR';
            gpuCardInfo.imgSrc = 'https://m.media-amazon.com/images/I/71rX8NLqZVL._AC_UF894,1000_QL80_.jpg';
            break;

        case 'AMD_RX_6600XT':
            gpuCardInfo.name = 'AMD RX 6600XT';
            gpuCardInfo.link = 'https://www.amazon.com.br/MSI-Radeon-RX-6600-XT/dp/B09BK6NJ9N';
            gpuCardInfo.imgSrc = 'https://m.media-amazon.com/images/I/718s0pX5zGL._AC_UF894,1000_QL80_.jpg';
            break;

        case 'NVIDIA_GTX_1650_Super':
            gpuCardInfo.name = 'NVIDIA GTX 1650 Super';
            gpuCardInfo.link = 'https://www.amazon.com.br/Placa-NVIDIA-GeForce-GV-N165SOC-4GD-GIGABYTE/dp/B0829CH63P';
            gpuCardInfo.imgSrc = 'https://m.media-amazon.com/images/I/61pr7LZDZeL._AC_UF894,1000_QL80_.jpg';
            break;

    }

    document.getElementById('gpu_img')
        .src = gpuCardInfo.imgSrc;

    document.getElementById('gpu_name')
        .textContent = gpuCardInfo.name;

    document.getElementById('gpu_link')
        .href = gpuCardInfo.link;

    document.getElementById('gpu_usage')
        .textContent = gpuUsage;
}

function createRAMCardInfo(ram, ramUsage) {
    const ramCardInfo = {
        'name': '',
        'imgSrc': '',
        'link': ''
    };

    switch (ram) {
        case 'Crucial_Ballistix_64GB_DDR4':
            ramCardInfo.name = 'CRUCIAL BALLISTIX 64GB DDR4';
            ramCardInfo.imgSrc = 'https://m.media-amazon.com/images/I/51V3WQnH77L._AC_UF894,1000_QL80_.jpg';
            ramCardInfo.link = 'https://www.amazon.com.br/mem%C3%B3ria-Crucial-Ballistix-32GBx2-BL2K32G36C16U4B/dp/B083TSLC72';
            break;

        case 'Patriot_Viper_Steel_32GB_DDR4':
            ramCardInfo.name = 'PATRIOT VIPER STEEL 32GB DDR4';
            ramCardInfo.imgSrc = 'https://images-na.ssl-images-amazon.com/images/I/91ZRYZkh4CL._AC_UL210_SR210,210_.jpg';
            ramCardInfo.link = 'https://www.amazon.com.br/Patriot-Viper-Steel-S%C3%A9rie-M%C3%B3dulo/dp/B08N68GBQD?th=1';
            break;

        case 'Kingston_HyperX__16GB_DDR4':
            ramCardInfo.name = 'KINGSTON HYPERX 16GB DDR4';
            ramCardInfo.imgSrc = 'https://m.media-amazon.com/images/I/61TUlElniWL._AC_UF1000,1000_QL80_.jpg';
            ramCardInfo.link = 'https://www.amazon.com.br/Mem%C3%B3ria-laptop-HyperX-Kingston-Technology/dp/B07BGL6493';
            break;

        case 'Corsair_Vengeance_LPX_8GB_DDR4':
            ramCardInfo.name = 'CORSAIR VENGEANCE LPX 8GB DDR4';
            ramCardInfo.imgSrc = 'https://m.media-amazon.com/images/I/41a2jzudKtL._AC_UF894,1000_QL80_.jpg';
            ramCardInfo.link = 'https://www.amazon.com.br/Mem%C3%B3ria-RAM-DDR4-2x8Gb-3200MHz/dp/B0143UM4TC';
            break;

        case 'Crucial_Ballistix_4GB_DDR4':
            ramCardInfo.name = 'CRUCIAL BALLISTIX 4GB DDR4';
            ramCardInfo.imgSrc = 'https://m.media-amazon.com/images/I/61zpIUZhlKL._AC_UF894,1000_QL80_.jpg';
            ramCardInfo.link = 'https://www.amazon.com.br/Micron-Memoria-Desktop-Ballistix-2400Mhz/dp/B00UFBZOKK';
            break;
    }

    document.getElementById('ram_img')
        .src = ramCardInfo.imgSrc;

    document.getElementById('ram_name')
        .textContent = ramCardInfo.name;

    document.getElementById('ram_link')
        .href = ramCardInfo.link;

    document.getElementById('ram_usage')
        .textContent = ramUsage;
}

function createRecommendationCards(data) {
    const cpuUsage = translateUsages(data.CPU_Usage);
    const gpuUsage = translateUsages(data.GPU_Usage);
    const ramUsage = translateUsages(data.RAM_Usage);

    createCpuCardInfo(data.Chosen_CPU, cpuUsage);
    createGPUCardInfo(data.Chosen_GPU, gpuUsage);
    createRAMCardInfo(data.Chosen_RAM, ramUsage);

    showRecommendationCards();
}

document.getElementById('clear-price-btn').onclick = function() { 
    document.querySelectorAll('input[name="priceGroup"]')
        .forEach((e) => e.checked = false);
}

document.getElementById('get-recommendation-button').onclick = function() {
    const isSomeUseSelected = [...document.querySelectorAll('input[name="usageGroup"]')]
        .some((e) => e.checked);

    if (!isSomeUseSelected) {
        M.toast({html: 'Selecione o que pretende fazer com o computador!'})
        return;
    }

    showLoadingSpinner();

    const usage = getUsesSelected();
    const price = getSelectedPrice();

    const request = {
        usage
    };

    if (price != null) {
        request.price = price;
        }

    getRecommendation(request, (data) => {
        const jsonData = JSON.parse(data);
        createRecommendationCards(jsonData);
        hideLoadingSpinner();
    });
}