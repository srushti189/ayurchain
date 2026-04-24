export const theme = {
  green: '#1a3a2a',
  greenMid: '#2d5a3d',
  greenLight: '#4a8c5c',
  cream: '#f5f0e8',
  creamDark: '#ede5d0',
  terracotta: '#c4622d',
  terracottaLight: '#e8845a',
  gold: '#c9a84c',
  text: '#1a1a1a',
  textLight: '#6b6b6b',
  white: '#ffffff',
};

export const css = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    background: #f5f0e8;
    font-family: 'DM Sans', sans-serif;
    color: #1a1a1a;
    min-height: 100vh;
  }
  h1, h2, h3 { font-family: 'Playfair Display', serif; }

  .btn-primary {
    background: #1a3a2a;
    color: #f5f0e8;
    border: none;
    padding: 12px 24px;
    border-radius: 4px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    letter-spacing: 0.5px;
    transition: background 0.2s;
  }
  .btn-primary:hover { background: #2d5a3d; }

  .btn-secondary {
    background: transparent;
    color: #1a3a2a;
    border: 1.5px solid #1a3a2a;
    padding: 11px 24px;
    border-radius: 4px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }
  .btn-secondary:hover { background: #1a3a2a; color: #f5f0e8; }

  .input {
    width: 100%;
    padding: 12px 16px;
    border: 1.5px solid #d4c9b0;
    border-radius: 4px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    background: #fff;
    color: #1a1a1a;
    outline: none;
    transition: border-color 0.2s;
    display: block;
  }
  .input:focus { border-color: #1a3a2a; }

  .card {
    background: #fff;
    border-radius: 8px;
    padding: 24px;
    border: 1px solid #e8e0cc;
    box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  }

  .tag {
    display: inline-block;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.8px;
  }
  .tag-harvested { background: #d4edda; color: #1a5c2a; }
  .tag-collected { background: #cce5ff; color: #1a3a5c; }
  .tag-processed { background: #fff3cd; color: #7a5c00; }
  .tag-manufactured { background: #f8d7da; color: #7a1a1a; }
`;