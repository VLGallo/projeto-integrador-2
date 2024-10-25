
import axios from 'axios';
import '../css/Pedidos.css'; 
import logoImage from '../assets/img/favicon.png';  
import pizzaIcon from '../assets/img/pizza.png';  

import * as React from 'react';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';

function not(a, b) {
  return a.filter((value) => !b.includes(value));
}

function intersection(a, b) {
  return a.filter((value) => b.includes(value));
}

export default function PedidoScreen() {
  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState(['123', '124', '125', '126', '127']);
  const [right, setRight] = React.useState([]);
  const [cliente, setCliente] = React.useState('');

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
  };

  const handleSave = () => {
    console.log('Pedido salvo:', cliente, right);
    // Lógica para salvar o pedido
  };

  const handleCancel = () => {
    setCliente('');
    setLeft(['123', '124', '125', '126', '127']);
    setRight([]);
  };

  const customList = (items) => (
    <Paper sx={{ width: 200, height: 230, overflow: 'auto' }}>
      <List dense component="div" role="list">
        {items.map((value) => {
          const labelId = `transfer-list-item-${value}-label`;

          return (
            <ListItemButton
              key={value}
              role="listitem"
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.includes(value)}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    'aria-labelledby': labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={value} />
            </ListItemButton>
          );
        })}
      </List>
    </Paper>
  );

  return (

    
    <Box className='pedidoscontainer' sx={{ p: 2 }}>

      

      <div className='Titulo'>
        <h1 className='pedidot'>ATRIBUIÇÃO DE PEDIDOS  🍕</h1>
        
      </div>
      

      <Grid  sx={{ mb: 5 }}  container spacing={2} sx={{ justifyContent: 'center', alignItems: 'center' }}>
        <Grid item xs={12}>
        <TextField            
            select            
            fullWidth
            label="Motoboy"            
            value={cliente}            
            onChange={(e) => setCliente(e.target.value)}          
            sx={{ mb: 20 }}  // Adicionei um espaçamento inferior de 30px
          >      
            {/* Adicione os clientes aqui */}
            <MenuItem value="Cliente 1">Motoboy 1</MenuItem>
            <MenuItem value="Cliente 2">Motoboy 2</MenuItem>
          </TextField>
        </Grid>

        <Grid item>{customList(left)}</Grid>

        <Grid item>
          <Grid container direction="column" sx={{ alignItems: 'center' }}>
            <Button
              sx={{ my: 0.1 }}
              variant="outlined"
              size="small"
              onClick={handleAllRight}
              disabled={left.length === 0}
              aria-label="move all right"
            >
              ≫
            </Button>
            <Button
              sx={{ my: 0.5 }}
              variant="outlined"
              size="small"
              onClick={handleCheckedRight}
              disabled={leftChecked.length === 0}
              aria-label="move selected right"
            >
              &gt;
            </Button>
            <Button
              sx={{ my: 0.5 }}
              variant="outlined"
              size="small"
              onClick={handleCheckedLeft}
              disabled={rightChecked.length === 0}
              aria-label="move selected left"
            >
              &lt;
            </Button>
            <Button
              sx={{ my: 0.5 }}
              variant="outlined"
              size="small"
              onClick={handleAllLeft}
              disabled={right.length === 0}
              aria-label="move all left"
            >
              ≪
            </Button>
          </Grid>
        </Grid>

        <Grid item>{customList(right)}</Grid>

        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Button
            variant="contained"
            color="success"
            onClick={handleSave}
          >
            Atribuir
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleCancel}
          >
            Cancelar
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
