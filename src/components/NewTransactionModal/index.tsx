import { FormEvent, useState } from 'react';
import Modal from 'react-modal'

import CloseImg from '../../assets/close.svg';
import IncomeImg from '../../assets/income.svg';
import OutcomeImg from '../../assets/outcome.svg';
import { useTransactions } from '../../hooks/useTransactions';

import { Container, TrasactionTypeContainer, RadioBox } from "./styles";

interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

export function NewTransactionModal({isOpen, onRequestClose}: NewTransactionModalProps) {
    const [title, setTitle] = useState('');
    const [amount, setAmout] = useState(0);
    const [category, setCategory] = useState('');
    const [type, setType] = useState('deposit');

    const {createTransaction} = useTransactions();

    async function handleCreateNewTransaction(event: FormEvent) {
        event.preventDefault();
        await createTransaction({title, amount, category, type})
        
        setTitle('');
        setAmout(0);
        setCategory('');
        setType('deposit')
        onRequestClose();
    }

    return (
        <Modal isOpen={isOpen} 
            onRequestClose={onRequestClose}
            overlayClassName="react-modal-overlay"
            className="react-modal-content">
            
            <button type="button" onClick={onRequestClose} className="react-modal-close">
                <img src={CloseImg} alt="fechar modal" />
            </button>
            
            <Container onSubmit={handleCreateNewTransaction}>
                <h2>Cadastrar Transação</h2>

                <input
                    placeholder='Título'
                    value={title}
                    onChange={event => setTitle(event.target.value)}
                    />
                <input
                    type="number"
                    placeholder='Valor'
                    value={amount}
                    onChange={event => setAmout(Number(event.target.value))}
                    />
                <TrasactionTypeContainer>
                    <RadioBox 
                        type='button'
                        isActive={type === 'deposit'}
                        activeColor="green"
                        onClick={() => setType('deposit')}
                        >
                        <img src={IncomeImg} alt="Entrada" />
                        <span>Entrada</span>
                    </RadioBox>

                    <RadioBox type='button'
                        onClick={() => setType('withdraw')}
                        isActive={type === 'withdraw'}
                        activeColor="red">
                        <img src={OutcomeImg} alt="Saída" />
                        <span>Saída</span>
                    </RadioBox>

                </TrasactionTypeContainer>

                <input
                    placeholder='Categoria'
                    value={category}
                    onChange={event => setCategory(event.target.value)}
                    />
                <button type='submit'>Cadastrar</button>
            </Container>
        </Modal> 
    )
}