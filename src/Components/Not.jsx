//
// Not.jsx
// Компонент-заглушка для отступа/пустого пространства

import React from 'react'

function Not() {
  return (
    <div style={{height: "75px"}}>
      <style>
        {
          `@media (max-width: 1104px) {
            .div {
              height: 80px;

            }
          }`
        }
      </style>
    </div>
  )
}

export default Not
