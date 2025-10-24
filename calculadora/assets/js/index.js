function criaCalculadora() {
    return {
        display: document.querySelector('.display'),
        btnClear: document.querySelector('.btn-clear'),

        inicia() {
            this.cliqueBotoes();
            this.pressionaEnter(); 
            this.permiteApenasNumeros(); 
        },

        pressionaEnter() {
            this.display.addEventListener('keydown', e => {
                if (e.key === 'Enter') {
                    this.realizaConta();
                }
            });
        },

        permiteApenasNumeros() {
            this.display.addEventListener('keydown', e => {
                const permitidos = [
                    '0','1','2','3','4','5','6','7','8','9',
                    '+','-','*','/','.','Backspace','Delete','ArrowLeft','ArrowRight','Enter'
                ];

                if (!permitidos.includes(e.key)) {
                    e.preventDefault();
                }
            });

            this.display.addEventListener('paste', e => {
                const texto = e.clipboardData.getData('text');
                if (/[^0-9+\-*/.]/.test(texto)) {
                    e.preventDefault();
                }
            });
        },

        realizaConta() {
            let conta = this.display.value;
            try {
                conta = eval(conta);
                if (conta === '' || Number.isNaN(conta) || typeof conta !== 'number') {
                    alert('Conta inválida');
                    return;
                }

                this.display.value = String(conta);
            } catch (e) {
                alert('Conta inválida');
                return;
            }
        },

        clearDisplay() {
            this.display.value = '';
        },

        apagaUm() {
            this.display.value = this.display.value.slice(0, -1);
        },

        cliqueBotoes() {
            document.addEventListener('click', (e) => {
                const el = e.target;

                if (el.classList.contains('btn-num')) {
                    this.btnParaDisplay(el.innerText);
                }

                if (el.classList.contains('btn-clear')) {
                    this.clearDisplay();
                }

                if (el.classList.contains('btn-del')) {
                    this.apagaUm();
                }

                if (el.classList.contains('btn-eq')) {
                    this.realizaConta();
                }

                if (!/Mobi|Android/i.test(navigator.userAgent)) {
                    this.display.focus();
                }
            });
        },

        btnParaDisplay(valor) {
            this.display.value += valor;
        },
    };
}

const calculadora = criaCalculadora();
calculadora.inicia();
