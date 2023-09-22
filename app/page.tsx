'use client'

import { JSXElementConstructor, Key, PromiseLikeOfReactNode, ReactElement, ReactNode, ReactPortal, useState } from 'react';

export default function Home() {
  const [participantes, setParticipantes] : [any, any] = useState([]);
  const [atribuicoes, setAtribuicoes] : [any, any] = useState([]);
  const [novoParticipante, setNovoParticipante] : [any, any] = useState('');
  const [novoAtributo, setNovoAtributo] : [any, any] = useState('');
  const [resultadoSorteio, setResultadoSorteio] : [any, any] = useState([]);

  const embaralharArray = (array: any) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const adicionarParticipante = () => {
    if (novoParticipante.trim() !== '') {
      setParticipantes([...participantes, novoParticipante]);
      setNovoParticipante('');
    }
  };

  const adicionarAtributo = () => {
    if (novoAtributo.trim() !== '') {
      setAtribuicoes([...atribuicoes, novoAtributo]);
      setNovoAtributo('');
    }
  };

  const realizarSorteio = () => {
    if (participantes.length === 0 || atribuicoes.length === 0) {
      console.log("Nenhum participante ou atribuição para sortear.");
      return;
    }

    const atribuicoesSorteadas = [];
    const participantesEmbaralhados = embaralharArray(participantes);
    const atribuicoesEmbaralhadas = embaralharArray(atribuicoes);

    for (let i = 0; i < participantesEmbaralhados.length; i++) {
      const participante = participantesEmbaralhados[i];
      const atribuicao = atribuicoesEmbaralhadas[i % atribuicoesEmbaralhadas.length];
      atribuicoesSorteadas.push({ participante, atribuicao });
    }

    setResultadoSorteio(atribuicoesSorteadas);
  };

  return (
    <div className="flex flex-col gap-20 justify-center items-center bg-indigo-300 bg-opacity-50 h-screen w-1/2 text-white">
      <div className='flex gap-48'>
        <div className='flex flex-col justify-center items-center gap-5 bg-indigo-300 bg-opacity-50 rounded-md p-5'>
          <h2 className='text-2xl'>Participantes</h2>
          <ul>
            {participantes.map((participante: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined, index: Key | null | undefined) => (
              <li className='text-xl' key={index}>{participante}</li>
            ))}
          </ul>
          <input
            className='shadow border rounded-md py-2 px-3 text-center text-black'
            type="text"
            placeholder="Novo participante"
            value={novoParticipante}
            onChange={(e) => setNovoParticipante(e.target.value)}
          />
          <button className='border rounded-md py-2 px-3 bg-indigo-800 text-white hover:bg-indigo-900 hover:transition-colors' onClick={adicionarParticipante}>Adicionar Participante</button>
        </div>
        <div className='flex flex-col justify-center items-center gap-5 bg-indigo-300 bg-opacity-50 rounded-md p-5'>
          <h2 className='text-2xl'>Atribuições</h2>
          <ul>
            {atribuicoes.map((atribuicao: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined, index: Key | null | undefined) => (
              <li className='text-xl' key={index}>{atribuicao}</li>
            ))}
          </ul>
          <input
            className='shadow border rounded-md py-2 px-3 text-center text-black'
            type="text"
            placeholder="Novo atributo"
            value={novoAtributo}
            onChange={(e) => setNovoAtributo(e.target.value)}
          />
          <button className='border rounded-md py-2 px-3 bg-indigo-800 text-white hover:bg-indigo-900 hover:transition-colors' onClick={adicionarAtributo}>Adicionar Atribuição</button>
        </div>
      </div>
      <button className='border rounded-md py-2 px-3 bg-indigo-800 text-white hover:bg-indigo-900 hover:transition-colors' onClick={realizarSorteio}>Realizar Sorteio</button>
      {resultadoSorteio.length > 0 && (
        <div className='flex flex-col justify-center items-center text-center gap-5 bg-indigo-300 bg-opacity-70 rounded-md p-5 w-1/2'>
          <h2 className='text-3xl'>Resultado do Sorteio</h2>
          <ul className='flex flex-col justify-center items-center text-center gap-5'>
            {resultadoSorteio.map((resultado: { participante: any; atribuicao: any; }, index: Key | null | undefined) => (
              <li className='flex gap-10 text-2xl' key={index}><span className='text-white'>{`${resultado.participante}`}</span><span>{` -> `}</span><span className='text-rose-600'>{`${resultado.atribuicao}`}</span></li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
