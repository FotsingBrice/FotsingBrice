document.addEventListener('DOMContentLoaded', () => {
    const addItemButton = document.getElementById('add-item');
    const itemsContainer = document.getElementById('items');
    const totalElement = document.getElementById('total');
    const generatePdfButton = document.getElementById('generate-pdf');

    addItemButton.addEventListener('click', addItem);
    itemsContainer.addEventListener('click', removeItem);
    generatePdfButton.addEventListener('click', generatePDF);

    function addItem() {
        const itemTemplate = `
            <div class="item">
                <input type="text" placeholder="Item Description" class="item-desc" required>
                <input type="number" placeholder="Quantity" class="item-qty" required>
                <input type="number" placeholder="Price" class="item-price" required>
                <button type="button" class="remove-item">Remove</button>
            </div>
        `;
        itemsContainer.insertAdjacentHTML('beforeend', itemTemplate);
    }

    function removeItem(event) {
        if (event.target.classList.contains('remove-item')) {
            event.target.parentElement.remove();
            calculateTotal();
        }
    }

    function calculateTotal() {
        let total = 0;
        const items = document.querySelectorAll('.item');
        items.forEach(item => {
            const qty = item.querySelector('.item-qty').value;
            const price = item.querySelector('.item-price').value;
            total += qty * price;
        });
        totalElement.textContent = total.toFixed(2);
    }

    itemsContainer.addEventListener('input', calculateTotal);

    function generatePDF() {
        const doc = new jsPDF();
        const clientName = document.getElementById('client-name').value;
        const clientEmail = document.getElementById('client-email').value;
        let content = `Client Name: ${clientName}\nClient Email: ${clientEmail}\n\nItems:\n\n`;

        const items = document.querySelectorAll('.item');
        items.forEach((item, index) => {
            const desc = item.querySelector('.item-desc').value;
            const qty = item.querySelector('.item-qty').value;
            const price = item.querySelector('.item-price').value;
            content += `${index + 1}. ${desc} - Qty: ${qty}, Price: ${price}\n`;
        });

        content += `\nTotal: ${totalElement.textContent}`;

        doc.text(content, 10, 10);
        doc.save('invoice.pdf');
    }
});