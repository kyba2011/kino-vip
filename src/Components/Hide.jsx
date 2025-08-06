import React from 'react'
import { FaCaretUp } from "react-icons/fa";

function Hide({ hidden, setHidden }) {
  return (
    <div className='hide'>
      <button
        className="hide-btn"
        onClick={() => setHidden(h => !h)}
        style={{
          transform: hidden ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.3s'
        }}
        aria-label="Скрыть/показать панель и хедер"
      >
        <FaCaretUp />
      </button>
    </div>
  )
}

export default Hide
