import { useState, useRef, useEffect } from "react";

const DEFAULT_FOODS = [
  { name: "Lentejas secas", per100: { kcal: 353, prot: 25, carbs: 60, fat: 1.1 }, emoji: "🟤" },
  { name: "Lentejas rojas secas", per100: { kcal: 340, prot: 24, carbs: 59, fat: 1 }, emoji: "🔴" },
  { name: "Garbanzos secos", per100: { kcal: 364, prot: 19, carbs: 61, fat: 6 }, emoji: "🟡" },
  { name: "Alubias negras secas", per100: { kcal: 341, prot: 21, carbs: 62, fat: 1.4 }, emoji: "⚫" },
  { name: "Alubias blancas secas", per100: { kcal: 333, prot: 23, carbs: 60, fat: 0.9 }, emoji: "⬜" },
  { name: "Guisantes secos", per100: { kcal: 341, prot: 24, carbs: 60, fat: 1.2 }, emoji: "🟢" },
  { name: "Guisantes cocidos", per100: { kcal: 84, prot: 5.4, carbs: 15, fat: 0.4 }, emoji: "🟢" },
  { name: "Guisantes congelados", per100: { kcal: 77, prot: 5.1, carbs: 14, fat: 0.3 }, emoji: "🟢" },
  { name: "Habas secas", per100: { kcal: 341, prot: 26, carbs: 58, fat: 1.5 }, emoji: "🫘" },
  { name: "Soja seca", per100: { kcal: 446, prot: 36, carbs: 30, fat: 20 }, emoji: "🫘" },
  { name: "Lentejas cocidas", per100: { kcal: 116, prot: 9, carbs: 20, fat: 0.4 }, emoji: "🟤" },
  { name: "Lentejas rojas cocidas", per100: { kcal: 110, prot: 8.5, carbs: 19, fat: 0.3 }, emoji: "🔴" },
  { name: "Garbanzos cocidos", per100: { kcal: 164, prot: 8.9, carbs: 27, fat: 2.6 }, emoji: "🟡" },
  { name: "Alubias negras cocidas", per100: { kcal: 132, prot: 8.9, carbs: 24, fat: 0.5 }, emoji: "⚫" },
  { name: "Alubias blancas cocidas", per100: { kcal: 127, prot: 8.7, carbs: 22, fat: 0.5 }, emoji: "⬜" },
  { name: "Soja texturizada fina", per100: { kcal: 345, prot: 52, carbs: 30, fat: 1 }, emoji: "🫘" },
  { name: "Soja texturizada gruesa", per100: { kcal: 345, prot: 50, carbs: 31, fat: 1.2 }, emoji: "🫘" },
  { name: "Tofu firme", per100: { kcal: 76, prot: 8, carbs: 1.9, fat: 4.8 }, emoji: "⬜" },
  { name: "Tofu sedoso", per100: { kcal: 55, prot: 5, carbs: 2.5, fat: 3 }, emoji: "🔲" },
  { name: "Tempeh", per100: { kcal: 193, prot: 19, carbs: 9, fat: 11 }, emoji: "🟫" },
  { name: "Seitán", per100: { kcal: 370, prot: 75, carbs: 14, fat: 1.9 }, emoji: "🥩" },
  { name: "Edamame", per100: { kcal: 122, prot: 11, carbs: 10, fat: 5.2 }, emoji: "💚" },
  { name: "Proteína de guisante en polvo", per100: { kcal: 370, prot: 80, carbs: 7, fat: 6 }, emoji: "💪" },
  { name: "Arroz integral seco", per100: { kcal: 370, prot: 7.9, carbs: 77, fat: 2.9 }, emoji: "🍚" },
  { name: "Arroz blanco seco", per100: { kcal: 365, prot: 7, carbs: 80, fat: 0.7 }, emoji: "🍚" },
  { name: "Arroz integral cocido", per100: { kcal: 123, prot: 2.7, carbs: 26, fat: 0.9 }, emoji: "🍚" },
  { name: "Arroz blanco cocido", per100: { kcal: 130, prot: 2.7, carbs: 28, fat: 0.3 }, emoji: "🍚" },
  { name: "Pasta integral cocida", per100: { kcal: 157, prot: 5.5, carbs: 30, fat: 1.1 }, emoji: "🍝" },
  { name: "Pasta blanca cocida", per100: { kcal: 158, prot: 5.8, carbs: 31, fat: 0.9 }, emoji: "🍝" },
  { name: "Avena", per100: { kcal: 389, prot: 17, carbs: 66, fat: 7 }, emoji: "🌾" },
  { name: "Quinoa cocida", per100: { kcal: 120, prot: 4.4, carbs: 21, fat: 1.9 }, emoji: "⚪" },
  { name: "Quinoa seca", per100: { kcal: 368, prot: 14, carbs: 64, fat: 6 }, emoji: "⚪" },
  { name: "Pan integral", per100: { kcal: 247, prot: 13, carbs: 41, fat: 3.4 }, emoji: "🍞" },
  { name: "Pan blanco", per100: { kcal: 265, prot: 9, carbs: 49, fat: 3.2 }, emoji: "🍞" },
  { name: "Cuscús cocido", per100: { kcal: 112, prot: 3.8, carbs: 23, fat: 0.2 }, emoji: "🟡" },
  { name: "Patata cocida", per100: { kcal: 77, prot: 2, carbs: 17, fat: 0.1 }, emoji: "🥔" },
  { name: "Boniato cocido", per100: { kcal: 90, prot: 2, carbs: 21, fat: 0.1 }, emoji: "🍠" },
  { name: "Brócoli", per100: { kcal: 34, prot: 2.8, carbs: 7, fat: 0.4 }, emoji: "🥦" },
  { name: "Espinacas", per100: { kcal: 23, prot: 2.9, carbs: 3.6, fat: 0.4 }, emoji: "🌿" },
  { name: "Zanahoria", per100: { kcal: 41, prot: 0.9, carbs: 10, fat: 0.2 }, emoji: "🥕" },
  { name: "Tomate", per100: { kcal: 18, prot: 0.9, carbs: 3.9, fat: 0.2 }, emoji: "🍅" },
  { name: "Tomate frito", per100: { kcal: 65, prot: 1.5, carbs: 9, fat: 3 }, emoji: "🍅" },
  { name: "Cebolla", per100: { kcal: 40, prot: 1.1, carbs: 9.3, fat: 0.1 }, emoji: "🧅" },
  { name: "Puerro", per100: { kcal: 31, prot: 1.5, carbs: 7, fat: 0.3 }, emoji: "🌿" },
  { name: "Ajo", per100: { kcal: 149, prot: 6.4, carbs: 33, fat: 0.5 }, emoji: "🧄" },
  { name: "Pimiento rojo", per100: { kcal: 31, prot: 1, carbs: 6, fat: 0.3 }, emoji: "🫑" },
  { name: "Pimiento verde", per100: { kcal: 20, prot: 0.9, carbs: 4.6, fat: 0.2 }, emoji: "🫑" },
  { name: "Calabacín", per100: { kcal: 17, prot: 1.2, carbs: 3.1, fat: 0.3 }, emoji: "🥒" },
  { name: "Berenjena", per100: { kcal: 25, prot: 1, carbs: 6, fat: 0.2 }, emoji: "🍆" },
  { name: "Champiñones", per100: { kcal: 22, prot: 3.1, carbs: 3.3, fat: 0.3 }, emoji: "🍄" },
  { name: "Col rizada (kale)", per100: { kcal: 49, prot: 4.3, carbs: 9, fat: 0.9 }, emoji: "🥬" },
  { name: "Coliflor", per100: { kcal: 25, prot: 1.9, carbs: 5, fat: 0.3 }, emoji: "⬜" },
  { name: "Judías verdes", per100: { kcal: 31, prot: 1.8, carbs: 7, fat: 0.1 }, emoji: "💚" },
  { name: "Pepino", per100: { kcal: 15, prot: 0.7, carbs: 3.6, fat: 0.1 }, emoji: "🥒" },
  { name: "Acelgas", per100: { kcal: 19, prot: 1.8, carbs: 3.7, fat: 0.2 }, emoji: "🌿" },
  { name: "Aguacate", per100: { kcal: 160, prot: 2, carbs: 9, fat: 15 }, emoji: "🥑" },
  { name: "Plátano", per100: { kcal: 89, prot: 1.1, carbs: 23, fat: 0.3 }, emoji: "🍌" },
  { name: "Manzana", per100: { kcal: 52, prot: 0.3, carbs: 14, fat: 0.2 }, emoji: "🍎" },
  { name: "Naranja", per100: { kcal: 47, prot: 0.9, carbs: 12, fat: 0.1 }, emoji: "🍊" },
  { name: "Aceite de oliva", per100: { kcal: 884, prot: 0, carbs: 0, fat: 100 }, emoji: "🫒" },
  { name: "Almendras", per100: { kcal: 579, prot: 21, carbs: 22, fat: 50 }, emoji: "🌰" },
  { name: "Nueces", per100: { kcal: 654, prot: 15, carbs: 14, fat: 65 }, emoji: "🫀" },
  { name: "Cacahuetes", per100: { kcal: 567, prot: 26, carbs: 16, fat: 49 }, emoji: "🥜" },
  { name: "Mantequilla de cacahuete", per100: { kcal: 588, prot: 25, carbs: 20, fat: 50 }, emoji: "🥜" },
  { name: "Semillas de cáñamo", per100: { kcal: 553, prot: 31, carbs: 8.7, fat: 49 }, emoji: "🌱" },
  { name: "Semillas de chía", per100: { kcal: 486, prot: 17, carbs: 42, fat: 31 }, emoji: "🔵" },
  { name: "Semillas de lino", per100: { kcal: 534, prot: 18, carbs: 29, fat: 42 }, emoji: "🟤" },
  { name: "Semillas de girasol", per100: { kcal: 584, prot: 21, carbs: 20, fat: 51 }, emoji: "🌻" },
  { name: "Levadura nutricional", per100: { kcal: 325, prot: 50, carbs: 38, fat: 5 }, emoji: "🟡" },
  { name: "Tahini", per100: { kcal: 595, prot: 17, carbs: 21, fat: 54 }, emoji: "🍯" },
  { name: "Hummus", per100: { kcal: 166, prot: 8, carbs: 14, fat: 10 }, emoji: "🫙" },
  { name: "Leche de avena", per100: { kcal: 47, prot: 1, carbs: 9, fat: 1.5 }, emoji: "🥛" },
  { name: "Leche de soja", per100: { kcal: 54, prot: 3.5, carbs: 6, fat: 1.8 }, emoji: "🥛" },
  { name: "Leche de almendras", per100: { kcal: 17, prot: 0.6, carbs: 3, fat: 0.4 }, emoji: "🥛" },
];

const MEAL_TYPES = [
  { id: "equilibrado", label: "Equilibrado", icon: "⚖️", desc: "Buen balance de macros" },
  { id: "proteico", label: "Proteico", icon: "💪", desc: "+30g de proteína" },
  { id: "carbos", label: "Energético", icon: "⚡", desc: "Rico en carbohidratos" },
  { id: "ligero", label: "Ligero", icon: "🍃", desc: "Bajo en calorías" },
];

const MEAL_IDEAS = {
  equilibrado: [
    { name: "Bowl de quinoa y garbanzos", ingredients: [{ food: "Quinoa cocida", grams: 180 }, { food: "Garbanzos cocidos", grams: 150 }, { food: "Espinacas", grams: 60 }, { food: "Aguacate", grams: 80 }], tip: "Aliña con tahini diluido en limón. Sin mucho fuego, rápido y completo." },
    { name: "Lentejas con boniato y verduras", ingredients: [{ food: "Lentejas cocidas", grams: 200 }, { food: "Boniato cocido", grams: 150 }, { food: "Zanahoria", grams: 80 }, { food: "Aceite de oliva", grams: 8 }], tip: "Sofríe con comino y cúrcuma. El boniato le da un punto dulce muy bueno." },
    { name: "Tofu con arroz y brócoli", ingredients: [{ food: "Tofu firme", grams: 180 }, { food: "Arroz integral cocido", grams: 180 }, { food: "Brócoli", grams: 150 }, { food: "Aceite de oliva", grams: 10 }], tip: "Marina el tofu con tamari, ajo y jengibre. Deja que dore bien en la sartén." },
  ],
  proteico: [
    { name: "Bowl de soja y seitán", ingredients: [{ food: "Soja texturizada fina", grams: 70 }, { food: "Seitán", grams: 100 }, { food: "Espinacas", grams: 80 }, { food: "Pimiento rojo", grams: 100 }], tip: "Hidrata la soja en caldo de verduras. Saltea todo con pimentón ahumado." },
    { name: "Tempeh con edamame y quinoa", ingredients: [{ food: "Tempeh", grams: 180 }, { food: "Edamame", grams: 120 }, { food: "Quinoa cocida", grams: 150 }, { food: "Semillas de cáñamo", grams: 20 }], tip: "Hornea el tempeh marinado. Las semillas de cáñamo encima en crudo." },
    { name: "Seitán al pimentón con patata", ingredients: [{ food: "Seitán", grams: 150 }, { food: "Patata cocida", grams: 200 }, { food: "Pimiento rojo", grams: 100 }, { food: "Aceite de oliva", grams: 10 }], tip: "Saltea el seitán hasta que quede crujiente. Con pimentón de La Vera queda brutal." },
  ],
  carbos: [
    { name: "Pasta integral con garbanzos", ingredients: [{ food: "Pasta integral cocida", grams: 250 }, { food: "Garbanzos cocidos", grams: 120 }, { food: "Tomate", grams: 150 }, { food: "Aceite de oliva", grams: 12 }], tip: "Salsa de tomate casera con ajo y albahaca. Simple y efectivo." },
    { name: "Boniato relleno de alubias", ingredients: [{ food: "Boniato cocido", grams: 300 }, { food: "Alubias negras cocidas", grams: 150 }, { food: "Pimiento rojo", grams: 80 }, { food: "Aguacate", grams: 60 }], tip: "Hornea el boniato entero 45 min. Ábrelo y rellena con las alubias salteadas." },
    { name: "Arroz con lentejas rojas", ingredients: [{ food: "Arroz blanco cocido", grams: 200 }, { food: "Lentejas rojas cocidas", grams: 150 }, { food: "Cebolla", grams: 80 }, { food: "Aceite de oliva", grams: 10 }], tip: "Sofríe la cebolla hasta que caramelice bien. Es la clave del plato." },
  ],
  ligero: [
    { name: "Ensalada de brócoli y tofu sedoso", ingredients: [{ food: "Tofu sedoso", grams: 200 }, { food: "Brócoli", grams: 200 }, { food: "Tomate", grams: 150 }, { food: "Semillas de chía", grams: 10 }], tip: "El tofu sedoso batido con limón y sal funciona como aderezo cremoso." },
    { name: "Sopa de verduras con champiñones", ingredients: [{ food: "Champiñones", grams: 150 }, { food: "Zanahoria", grams: 100 }, { food: "Espinacas", grams: 100 }, { food: "Cebolla", grams: 80 }], tip: "Caldo de verduras, poca grasa, muchas especias. Jengibre y cúrcuma le van muy bien." },
    { name: "Bowl verde de espinacas y edamame", ingredients: [{ food: "Espinacas", grams: 150 }, { food: "Edamame", grams: 100 }, { food: "Calabacín", grams: 120 }, { food: "Semillas de lino", grams: 15 }], tip: "Aliña solo con limón y un poco de sal. Ligero pero sorprendentemente saciante." },
  ],
};

const ACTIVITY_LEVELS = [
  { id: "sedentario", label: "Sedentario", desc: "Poco o nada de ejercicio", factor: 1.2 },
  { id: "ligero_act", label: "Ligero", desc: "1–3 días/semana", factor: 1.375 },
  { id: "moderado", label: "Moderado", desc: "3–5 días/semana", factor: 1.55 },
  { id: "activo", label: "Activo", desc: "6–7 días/semana", factor: 1.725 },
  { id: "muy_activo", label: "Muy activo", desc: "Físico intenso o doble entreno", factor: 1.9 },
];

function getMacros(items, foods) {
  return items.reduce((acc, item) => {
    const food = foods.find(f => f.name === item.food);
    if (!food) return acc;
    const r = item.grams / 100;
    return { kcal: acc.kcal + food.per100.kcal * r, prot: acc.prot + food.per100.prot * r, carbs: acc.carbs + food.per100.carbs * r, fat: acc.fat + food.per100.fat * r };
  }, { kcal: 0, prot: 0, carbs: 0, fat: 0 });
}

function FoodSearch({ value, onChange, allFoods, onGoCustom }) {
  const [query, setQuery] = useState(value || "");
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const filtered = allFoods.filter(f => f.name.toLowerCase().includes(query.toLowerCase())).slice(0, 8);
  const noResults = query.length > 1 && filtered.length === 0;

  useEffect(() => {
    const h = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  useEffect(() => { if (value && value !== query) setQuery(value); }, [value]);

  const inputStyle = {
    background: "#0a0a0a", border: "1px solid #222", color: "#e8e8e8",
    borderRadius: 8, padding: "9px 12px", fontSize: 13, width: "100%",
    boxSizing: "border-box", outline: "none", fontFamily: "inherit",
  };

  return (
    <div ref={ref} style={{ position: "relative", flex: 1 }}>
      <input
        type="text" value={query}
        onChange={e => { setQuery(e.target.value); setOpen(true); onChange(""); }}
        onFocus={() => setOpen(true)}
        placeholder="Buscar ingrediente..."
        style={inputStyle}
      />
      {open && query.length > 0 && (
        <div style={{ position: "absolute", top: "calc(100% + 4px)", left: 0, right: 0, zIndex: 999, background: "#141414", border: "1px solid #252525", borderRadius: 10, overflow: "hidden", boxShadow: "0 12px 40px rgba(0,0,0,0.8)" }}>
          {filtered.map(f => (
            <div key={f.name}
              onClick={() => { setQuery(f.name); onChange(f.name); setOpen(false); }}
              style={{ padding: "9px 12px", cursor: "pointer", fontSize: 13, display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #1a1a1a" }}
              onMouseEnter={e => e.currentTarget.style.background = "#1a2e1a"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            >
              <span>{f.emoji || "🌿"} {f.name}{f.custom ? <span style={{ fontSize: 10, color: "#40a070", marginLeft: 6 }}>mío</span> : ""}</span>
              <span style={{ fontSize: 11, color: "#444", fontFamily: "monospace" }}>{f.per100.kcal} kcal/100g</span>
            </div>
          ))}
          {noResults && (
            <div style={{ padding: "10px 12px", fontSize: 12, color: "#555" }}>
              No encontrado —{" "}
              <span style={{ color: "#7fff7f", cursor: "pointer" }} onClick={() => { setOpen(false); onGoCustom(); }}>
                ¿Añadirlo tú mismo?
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function MacroBar({ label, value, max, color }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 3, fontFamily: "monospace", color: "#888" }}>
        <span>{label}</span><span style={{ color: "#ccc" }}>{value.toFixed(1)}g</span>
      </div>
      <div style={{ height: 6, background: "#1e1e1e", borderRadius: 3, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${Math.min((value / max) * 100, 100)}%`, background: color, borderRadius: 3, transition: "width 0.4s ease" }} />
      </div>
    </div>
  );
}

export default function App() {
  // ── Styles defined inside component to avoid global name conflicts ──
  const ST = {
    app: { minHeight: "100vh", background: "#0a0a0a", color: "#e8e8e8", fontFamily: "'DM Sans', sans-serif", paddingBottom: 60 },
    card: { background: "#111", border: "1px solid #1a1a1a", borderRadius: 12, padding: 18, marginBottom: 14 },
    cardGreen: { background: "#0d1a0d", border: "1px solid #1a2e1a", borderRadius: 12, padding: 18, marginBottom: 14 },
    label: { fontSize: 11, color: "#444", textTransform: "uppercase", letterSpacing: "1px", fontFamily: "monospace" },
    input: { background: "#0a0a0a", border: "1px solid #1e1e1e", color: "#e8e8e8", borderRadius: 8, padding: "9px 11px", fontSize: 13, outline: "none", width: "100%", boxSizing: "border-box", fontFamily: "inherit" },
    textarea: { background: "#0a0a0a", border: "1px solid #1e1e1e", color: "#e8e8e8", borderRadius: 8, padding: "11px 12px", fontSize: 13, width: "100%", resize: "vertical", minHeight: 72, fontFamily: "inherit", boxSizing: "border-box", outline: "none" },
    btnPrimary: { padding: "11px 18px", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 600, background: "#1a2e1a", color: "#7fff7f", border: "1px solid #2a4a2a", transition: "all 0.2s", fontFamily: "inherit" },
    btnGhost: { padding: "11px 18px", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 600, background: "transparent", color: "#555", border: "1px solid #1a1a1a", transition: "all 0.2s", fontFamily: "inherit" },
    btnDanger: { padding: "5px 10px", borderRadius: 8, cursor: "pointer", fontSize: 12, fontWeight: 600, background: "#1a0a0a", color: "#e05555", border: "1px solid #2a1010", fontFamily: "inherit" },
    btnOff: { padding: "7px 12px", borderRadius: 8, cursor: "pointer", fontSize: 12, fontWeight: 600, background: "transparent", color: "#555", border: "1px solid #1e1e1e", fontFamily: "inherit" },
    btnOn: { padding: "7px 12px", borderRadius: 8, cursor: "pointer", fontSize: 12, fontWeight: 600, background: "#1a2e1a", color: "#7fff7f", border: "1px solid #2a4a2a", fontFamily: "inherit" },
    tabActive: { padding: "11px 14px", cursor: "pointer", fontSize: 11, fontWeight: 700, border: "none", background: "none", color: "#7fff7f", borderBottom: "2px solid #7fff7f", letterSpacing: "0.6px", textTransform: "uppercase", whiteSpace: "nowrap", fontFamily: "inherit" },
    tabInactive: { padding: "11px 14px", cursor: "pointer", fontSize: 11, fontWeight: 700, border: "none", background: "none", color: "#333", borderBottom: "2px solid transparent", letterSpacing: "0.6px", textTransform: "uppercase", whiteSpace: "nowrap", fontFamily: "inherit" },
  };

  const [tab, setTab] = useState("guia");
  const [items, setItems] = useState([{ food: "Lentejas cocidas", grams: 200 }]);
  const [customFoods, setCustomFoods] = useState([]);
  const [mealType, setMealType] = useState("equilibrado");
  const [idea, setIdea] = useState(null);
  const [loading, setLoading] = useState(false);
  const [promptMode, setPromptMode] = useState("ingredientes");
  const [customPrompt, setCustomPrompt] = useState("");
  const [ingredientesCasa, setIngredientesCasa] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [peso, setPeso] = useState(70);
  const [altura, setAltura] = useState(170);
  const [edad, setEdad] = useState(28);
  const [sexo, setSexo] = useState("hombre");
  const [actividad, setActividad] = useState("moderado");
  const [objetivo, setObjetivo] = useState("mantener");
  const [tdeeResult, setTdeeResult] = useState(null);
  const [newName, setNewName] = useState("");
  const [newKcal, setNewKcal] = useState("");
  const [newProt, setNewProt] = useState("");
  const [newCarbs, setNewCarbs] = useState("");
  const [newFat, setNewFat] = useState("");
  const [newEmoji, setNewEmoji] = useState("🌿");
  const [savedMsg, setSavedMsg] = useState("");

  const allFoods = [...DEFAULT_FOODS, ...customFoods];
  const macros = getMacros(items, allFoods);

  const addItem = () => setItems(prev => [...prev, { food: "", grams: 100 }]);
  const removeItem = i => setItems(prev => prev.filter((_, idx) => idx !== i));
  const updateFood = (i, food) => setItems(prev => { const u = [...prev]; u[i] = { ...u[i], food }; return u; });
  const updateGrams = (i, g) => setItems(prev => { const u = [...prev]; u[i] = { ...u[i], grams: Number(g) }; return u; });

  const addCustomFood = () => {
    if (!newName.trim() || !newKcal) return;
    const food = { name: newName.trim(), per100: { kcal: Number(newKcal), prot: Number(newProt) || 0, carbs: Number(newCarbs) || 0, fat: Number(newFat) || 0 }, emoji: newEmoji || "🌿", custom: true };
    setCustomFoods(prev => [...prev, food]);
    setNewName(""); setNewKcal(""); setNewProt(""); setNewCarbs(""); setNewFat(""); setNewEmoji("🌿");
    setSavedMsg(`✓ "${food.name}" añadido`);
    setTimeout(() => setSavedMsg(""), 3000);
  };

  const mealTypeLabel = { equilibrado: "equilibrado", proteico: "proteico y alto en proteína", carbos: "rico en carbohidratos", ligero: "ligero y bajo en calorías" }[mealType];

  const askAI = async () => {
    const prompt = promptMode === "ingredientes"
      ? `Tengo estos ingredientes en casa: ${ingredientesCasa}. Propónme un plato vegano ${mealTypeLabel}. Dame: nombre del plato, ingredientes con cantidades en gramos, macros estimados totales (kcal, proteína, carbohidratos, grasa) y un consejo de preparación breve.`
      : customPrompt;
    if (!prompt.trim()) return;
    setLoading(true);
    setAiResponse("");
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json", "anthropic-version": "2023-06-01", "anthropic-dangerous-direct-browser-access": "true" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 800,
          system: "Eres un nutricionista especializado en dieta vegana mediterránea. Responde siempre en español, de forma concisa y práctica.",
          messages: [{ role: "user", content: prompt }],
        }),
      });
      const data = await res.json();
      if (data.error) { setAiResponse("Error: " + data.error.message); setLoading(false); return; }
      const text = (data.content || []).filter(b => b.type === "text").map(b => b.text).join("\n");
      setAiResponse(text || "Sin respuesta.");
    } catch (e) {
      setAiResponse("Error de conexión: " + e.message);
    }
    setLoading(false);
  };

  const calcularTDEE = () => {
    const act = ACTIVITY_LEVELS.find(a => a.id === actividad);
    const bmr = sexo === "hombre" ? 10 * peso + 6.25 * altura - 5 * edad + 5 : 10 * peso + 6.25 * altura - 5 * edad - 161;
    const tdee = Math.round(bmr * act.factor);
    const ajuste = { perder: -300, perder_rapido: -500, mantener: 0, ganar: 300 }[objetivo] || 0;
    setTdeeResult({ tdee, meta: tdee + ajuste, protMin: Math.round(peso * 1.6), protMax: Math.round(peso * 2.0) });
  };

  const TABS = [
    { id: "guia", label: "📖 Guía" },
    { id: "calc", label: "🧮 Calculadora" },
    { id: "ideas", label: "💡 Ideas" },
    { id: "tdee", label: "🔥 Calorías" },
    { id: "custom", label: "➕ Ingredientes" },
  ];

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@400;600&display=swap" rel="stylesheet" />
      <div style={ST.app}>

        {/* Header */}
        <div style={{ padding: "24px 22px 14px", borderBottom: "1px solid #141414" }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 700, margin: 0, background: "linear-gradient(135deg, #7fff7f, #40e0a0)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>🌱 VeganMacros</h1>
          <p style={{ color: "#333", fontSize: 11, marginTop: 3, fontFamily: "monospace" }}>calculadora · ideas · calorías · mis ingredientes</p>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", borderBottom: "1px solid #141414", overflowX: "auto" }}>
          {TABS.map(t => (
            <button key={t.id} style={tab === t.id ? ST.tabActive : ST.tabInactive} onClick={() => setTab(t.id)}>
              {t.label}
            </button>
          ))}
        </div>

        <div style={{ padding: "20px 22px" }}>

          {/* ── GUÍA ── */}
          {tab === "guia" && (
            <div>
              <div style={ST.cardGreen}>
                <p style={{ fontSize: 13, color: "#aaa", lineHeight: 1.7, margin: 0 }}>Esta app ayuda a llevar el control de lo que comes si sigues una dieta vegana. Sin complicaciones — calcula los nutrientes de tu plato, obtén ideas de recetas, descubre cuántas calorías necesitas al día y añade tus propios ingredientes.</p>
              </div>

              {[
                {
                  icon: "🧮", title: "Calculadora de macros",
                  desc: "Calcula los nutrientes de cualquier plato que vayas a preparar.",
                  steps: ["Pulsa «Calculadora» arriba.", "Toca el campo de texto y escribe el nombre del alimento, por ejemplo «lentejas» o «tofu».", "Selecciona el alimento de la lista que aparece.", "Escribe la cantidad en gramos. Por ejemplo, 200.", "Arriba verás al instante las calorías, proteínas, carbohidratos y grasas totales.", "Pulsa «+ Añadir ingrediente» para sumar más alimentos."],
                  tip: "Ejemplo: Para saber los macros de un plato de lentejas con patata y zanahoria, añades cada ingrediente con su cantidad y ves el total al momento."
                },
                {
                  icon: "💡", title: "¿Qué como hoy?",
                  desc: "Obtén ideas de platos veganos completos y equilibrados.",
                  steps: ["Pulsa «Ideas» arriba.", "Elige el tipo de plato: equilibrado, proteico, energético o ligero.", "Pulsa «Generar idea» para ver una receta completa con macros.", "Si te gusta, pulsa «Cargar en calculadora» para ajustar cantidades.", "O usa la IA: escribe los ingredientes que tienes en casa y te propone un plato."],
                  tip: "Ejemplo: Escribes «lentejas cocidas, patata, puerro, tomate frito» y la IA te propone un plato equilibrado con esos ingredientes."
                },
                {
                  icon: "🔥", title: "Mis calorías diarias",
                  desc: "Calcula cuántas calorías necesitas cada día según tu cuerpo y actividad.",
                  steps: ["Pulsa «Calorías» arriba.", "Introduce tu peso, altura y edad.", "Elige tu sexo biológico.", "Selecciona tu nivel de actividad física habitual.", "Elige tu objetivo (perder peso, mantener, ganar masa).", "Pulsa «Calcular» y verás tu gasto diario y meta calórica."],
                  tip: "Ejemplo: Pesas 68kg, mides 170cm, tienes 30 años, haces ejercicio 3 veces/semana. La app te dice que necesitas unas 2.100 kcal/día para mantener tu peso."
                },
                {
                  icon: "➕", title: "Añadir mis ingredientes",
                  desc: "Si un alimento no aparece en la búsqueda, lo añades tú mismo.",
                  steps: ["Pulsa «Ingredientes» arriba.", "Escribe el nombre del alimento.", "Mira el envase del producto y copia los valores nutricionales por 100g.", "Pulsa «Añadir a mi calculadora».", "¡Listo! Aparecerá automáticamente en la búsqueda."],
                  tip: "Ejemplo: Tienes un paquete de «Hamburguesa de soja marca X». Miras el envase, introduces los macros por 100g, y ya puedes usarlo en la calculadora."
                },
              ].map(s => (
                <div key={s.icon} style={ST.card}>
                  <div style={{ fontSize: 22, marginBottom: 6 }}>{s.icon}</div>
                  <div style={{ fontSize: 15, fontWeight: 700, fontFamily: "'Playfair Display', serif", color: "#e8e8e8", marginBottom: 4 }}>{s.title}</div>
                  <div style={{ fontSize: 12, color: "#555", marginBottom: 12 }}>{s.desc}</div>
                  <ol style={{ paddingLeft: 18, margin: "0 0 12px" }}>
                    {s.steps.map((st, i) => <li key={i} style={{ fontSize: 13, color: "#bbb", marginBottom: 6, lineHeight: 1.6 }}>{st}</li>)}
                  </ol>
                  <div style={{ background: "#0d1a0d", borderRadius: 8, padding: "10px 12px", fontSize: 12, color: "#7fff7f", lineHeight: 1.6 }}>💬 {s.tip}</div>
                </div>
              ))}

              <div style={{ ...ST.card, borderColor: "#1a2e1a" }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#7fff7f", marginBottom: 10 }}>Consejos rápidos</div>
                {[
                  "Proteínas, carbohidratos y grasas son los tres macronutrientes. Las calorías miden la energía total.",
                  "En dieta vegana, combina legumbres + cereales para obtener proteína completa (ej: lentejas + arroz).",
                  "Los valores de la calculadora son siempre por 100g del alimento tal como lo indiques (crudo o cocido).",
                  "La sección «Mis calorías» es una estimación orientativa. Ajusta según tu progreso real.",
                ].map((tip, i) => (
                  <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                    <span style={{ color: "#7fff7f", fontSize: 13 }}>→</span>
                    <span style={{ fontSize: 12, color: "#999", lineHeight: 1.6 }}>{tip}</span>
                  </div>
                ))}
              </div>

              <button style={{ ...ST.btnPrimary, width: "100%", padding: "14px" }} onClick={() => setTab("calc")}>
                Empezar — ir a la calculadora →
              </button>
            </div>
          )}

          {/* ── CALCULADORA ── */}
          {tab === "calc" && (
            <>
              <div style={ST.cardGreen}>
                <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                  {[
                    { val: Math.round(macros.kcal), lbl: "kcal", color: "#7fff7f" },
                    { val: macros.prot.toFixed(1), lbl: "proteína", color: "#60a0ff" },
                    { val: macros.carbs.toFixed(1), lbl: "carbos", color: "#ffb347" },
                    { val: macros.fat.toFixed(1), lbl: "grasa", color: "#ff7f7f" },
                  ].map((m, i, arr) => (
                    <div key={m.lbl} style={{ display: "flex", flex: 1 }}>
                      <div style={{ flex: 1, textAlign: "center" }}>
                        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 21, fontWeight: 700, color: m.color, lineHeight: 1 }}>{m.val}</div>
                        <div style={{ ...ST.label, marginTop: 4, fontSize: 10 }}>{m.lbl}</div>
                      </div>
                      {i < arr.length - 1 && <div style={{ width: 1, background: "#1a2e1a", marginLeft: 8 }} />}
                    </div>
                  ))}
                </div>
                <MacroBar label="Proteína" value={macros.prot} max={80} color="#60a0ff" />
                <MacroBar label="Carbohidratos" value={macros.carbs} max={200} color="#ffb347" />
                <MacroBar label="Grasa" value={macros.fat} max={60} color="#ff7f7f" />
              </div>

              {items.map((item, i) => {
                const food = allFoods.find(f => f.name === item.food);
                const m = food ? getMacros([item], allFoods) : null;
                return (
                  <div key={i} style={ST.card}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                      <span style={{ ...ST.label, fontSize: 10 }}>ingrediente {i + 1}</span>
                      <button style={ST.btnDanger} onClick={() => removeItem(i)}>✕</button>
                    </div>
                    <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 6 }}>
                      <FoodSearch value={item.food} onChange={v => updateFood(i, v)} allFoods={allFoods} onGoCustom={() => setTab("custom")} />
                      <input type="number" value={item.grams} min={0} max={2000}
                        onChange={e => updateGrams(i, e.target.value)}
                        style={{ background: "#0a0a0a", border: "1px solid #1e1e1e", color: "#e8e8e8", borderRadius: 8, padding: "9px 8px", fontSize: 13, width: 58, outline: "none", fontFamily: "inherit" }} />
                      <span style={{ fontSize: 12, color: "#333" }}>g</span>
                    </div>
                    {m && <div style={{ fontSize: 11, color: "#444", fontFamily: "monospace" }}>{Math.round(m.kcal)} kcal · {m.prot.toFixed(1)}P · {m.carbs.toFixed(1)}C · {m.fat.toFixed(1)}G</div>}
                  </div>
                );
              })}
              <button style={{ ...ST.btnPrimary, width: "100%" }} onClick={addItem}>+ Añadir ingrediente</button>
            </>
          )}

          {/* ── IDEAS ── */}
          {tab === "ideas" && (
            <>
              <div style={ST.card}>
                <div style={{ ...ST.label, marginBottom: 12 }}>¿Qué tipo de plato buscas?</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  {MEAL_TYPES.map(t => (
                    <button key={t.id} onClick={() => { setMealType(t.id); setIdea(null); setAiResponse(""); }}
                      style={{ padding: "12px 10px", borderRadius: 10, cursor: "pointer", textAlign: "left", background: mealType === t.id ? "#1a2e1a" : "#0f0f0f", border: `1px solid ${mealType === t.id ? "#2a4a2a" : "#1a1a1a"}`, transition: "all 0.2s", fontFamily: "inherit" }}>
                      <div style={{ fontSize: 20, marginBottom: 4 }}>{t.icon}</div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: mealType === t.id ? "#7fff7f" : "#999" }}>{t.label}</div>
                      <div style={{ fontSize: 11, color: "#444", marginTop: 2 }}>{t.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <button style={{ ...ST.btnPrimary, width: "100%", marginBottom: 14 }}
                onClick={() => { const p = MEAL_IDEAS[mealType]; setIdea(p[Math.floor(Math.random() * p.length)]); setAiResponse(""); }}>
                🎲 Generar idea {MEAL_TYPES.find(t => t.id === mealType)?.icon}
              </button>

              {idea && (
                <div style={{ ...ST.card, borderColor: "#1a2e1a" }}>
                  <div style={{ fontSize: 15, fontWeight: 700, fontFamily: "'Playfair Display', serif", color: "#7fff7f", marginBottom: 12 }}>{idea.name}</div>
                  {idea.ingredients.map((ing, i) => {
                    const food = allFoods.find(f => f.name === ing.food);
                    const m = food ? getMacros([ing], allFoods) : null;
                    return (
                      <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: "1px solid #161616" }}>
                        <span style={{ fontSize: 13 }}>{food?.emoji} {ing.food}</span>
                        <span style={{ fontSize: 11, color: "#444", fontFamily: "monospace" }}>{ing.grams}g{m ? ` · ${Math.round(m.kcal)} kcal` : ""}</span>
                      </div>
                    );
                  })}
                  {(() => {
                    const t = getMacros(idea.ingredients, allFoods);
                    return <div style={{ marginTop: 12, padding: "10px 12px", background: "#0d1a0d", borderRadius: 8, fontFamily: "monospace", fontSize: 12, color: "#7fff7f" }}>{Math.round(t.kcal)} kcal · {t.prot.toFixed(1)}g P · {t.carbs.toFixed(1)}g C · {t.fat.toFixed(1)}g G</div>;
                  })()}
                  <div style={{ marginTop: 10, fontSize: 12, color: "#555", fontStyle: "italic", lineHeight: 1.6 }}>💡 {idea.tip}</div>
                  <button style={{ ...ST.btnGhost, width: "100%", marginTop: 12 }}
                    onClick={() => { setItems(idea.ingredients.filter(ing => allFoods.find(f => f.name === ing.food))); setTab("calc"); }}>
                    → Cargar en calculadora
                  </button>
                </div>
              )}

              {/* IA */}
              <div style={{ ...ST.card, marginTop: 4 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#7fff7f", marginBottom: 12 }}>✨ Pregunta a la IA</div>
                <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
                  <button style={promptMode === "ingredientes" ? ST.btnOn : ST.btnOff} onClick={() => setPromptMode("ingredientes")}>Lo que tengo en casa</button>
                  <button style={promptMode === "libre" ? ST.btnOn : ST.btnOff} onClick={() => setPromptMode("libre")}>Pregunta libre</button>
                </div>
                <textarea style={ST.textarea}
                  placeholder={promptMode === "ingredientes" ? 'Ej: "lentejas cocidas, patata, puerro, tomate frito, aceite de oliva"' : 'Ej: "Algo proteico con soja, fácil y rápido"'}
                  value={promptMode === "ingredientes" ? ingredientesCasa : customPrompt}
                  onChange={e => promptMode === "ingredientes" ? setIngredientesCasa(e.target.value) : setCustomPrompt(e.target.value)}
                />
                <div style={{ ...ST.label, fontSize: 10, marginTop: 8, marginBottom: 10 }}>tipo: {MEAL_TYPES.find(t => t.id === mealType)?.icon} {MEAL_TYPES.find(t => t.id === mealType)?.label}</div>
                <button style={{ ...ST.btnPrimary, width: "100%", opacity: loading ? 0.6 : 1 }} onClick={askAI} disabled={loading}>
                  {loading ? "Pensando..." : "Generar con IA"}
                </button>
                {aiResponse && (
                  <div style={{ marginTop: 16, fontSize: 13, color: "#bbb", lineHeight: 1.8, whiteSpace: "pre-wrap", borderTop: "1px solid #1a1a1a", paddingTop: 14 }}>
                    {aiResponse}
                  </div>
                )}
              </div>
            </>
          )}

          {/* ── CALORÍAS ── */}
          {tab === "tdee" && (
            <>
              <div style={ST.card}>
                <div style={{ ...ST.label, marginBottom: 14 }}>Tus datos</div>
                <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
                  {[{ lbl: "Peso", val: peso, set: setPeso, unit: "kg" }, { lbl: "Altura", val: altura, set: setAltura, unit: "cm" }, { lbl: "Edad", val: edad, set: setEdad, unit: "años" }].map(f => (
                    <div key={f.lbl} style={{ flex: 1 }}>
                      <div style={{ ...ST.label, fontSize: 10, marginBottom: 5 }}>{f.lbl}</div>
                      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                        <input type="number" value={f.val} onChange={e => f.set(Number(e.target.value))} style={ST.input} />
                        <span style={{ fontSize: 11, color: "#333", whiteSpace: "nowrap" }}>{f.unit}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ ...ST.label, marginBottom: 8 }}>Sexo biológico</div>
                <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                  {["hombre", "mujer"].map(s => (
                    <button key={s} style={{ ...(sexo === s ? ST.btnPrimary : ST.btnGhost), flex: 1, textTransform: "capitalize" }} onClick={() => setSexo(s)}>{s}</button>
                  ))}
                </div>

                <div style={{ ...ST.label, marginBottom: 8 }}>Nivel de actividad</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 16 }}>
                  {ACTIVITY_LEVELS.map(a => (
                    <button key={a.id} onClick={() => setActividad(a.id)}
                      style={{ padding: "10px 14px", borderRadius: 8, cursor: "pointer", textAlign: "left", background: actividad === a.id ? "#1a2e1a" : "#0f0f0f", border: `1px solid ${actividad === a.id ? "#2a4a2a" : "#1a1a1a"}`, display: "flex", justifyContent: "space-between", alignItems: "center", transition: "all 0.2s", fontFamily: "inherit" }}>
                      <span style={{ fontSize: 13, color: actividad === a.id ? "#7fff7f" : "#999" }}>{a.label}</span>
                      <span style={{ fontSize: 11, color: "#444" }}>{a.desc}</span>
                    </button>
                  ))}
                </div>

                <div style={{ ...ST.label, marginBottom: 8 }}>Objetivo</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginBottom: 20 }}>
                  {[{ id: "perder", label: "Perder peso", sub: "−300 kcal" }, { id: "perder_rapido", label: "Déficit fuerte", sub: "−500 kcal" }, { id: "mantener", label: "Mantener", sub: "±0 kcal" }, { id: "ganar", label: "Ganar masa", sub: "+300 kcal" }].map(o => (
                    <button key={o.id} onClick={() => setObjetivo(o.id)}
                      style={{ padding: "10px", borderRadius: 8, cursor: "pointer", textAlign: "left", background: objetivo === o.id ? "#1a2e1a" : "#0f0f0f", border: `1px solid ${objetivo === o.id ? "#2a4a2a" : "#1a1a1a"}`, transition: "all 0.2s", fontFamily: "inherit" }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: objetivo === o.id ? "#7fff7f" : "#888" }}>{o.label}</div>
                      <div style={{ fontSize: 11, color: "#444", marginTop: 2 }}>{o.sub}</div>
                    </button>
                  ))}
                </div>

                <button style={{ ...ST.btnPrimary, width: "100%" }} onClick={calcularTDEE}>Calcular</button>
              </div>

              {tdeeResult && (
                <div style={ST.cardGreen}>
                  <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
                    <div style={{ flex: 1, textAlign: "center" }}>
                      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, color: "#7fff7f" }}>{tdeeResult.tdee}</div>
                      <div style={{ ...ST.label, marginTop: 6, fontSize: 10 }}>quemas al día</div>
                    </div>
                    <div style={{ width: 1, background: "#1a2e1a" }} />
                    <div style={{ flex: 1, textAlign: "center" }}>
                      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, color: "#60a0ff" }}>{tdeeResult.meta}</div>
                      <div style={{ ...ST.label, marginTop: 6, fontSize: 10 }}>meta diaria</div>
                    </div>
                  </div>
                  <div style={{ background: "#0a0a0a", borderRadius: 8, padding: "12px 14px", marginBottom: 10 }}>
                    <div style={{ fontSize: 12, color: "#555", marginBottom: 4, fontFamily: "monospace" }}>proteína recomendada (vegana)</div>
                    <div style={{ fontSize: 14, color: "#e8e8e8" }}><span style={{ color: "#7fff7f", fontWeight: 700 }}>{tdeeResult.protMin}–{tdeeResult.protMax}g</span> al día</div>
                    <div style={{ fontSize: 11, color: "#444", marginTop: 3 }}>1.6–2.0g por kg de peso corporal</div>
                  </div>
                  <div style={{ fontSize: 12, color: "#555", fontStyle: "italic", lineHeight: 1.7 }}>Basado en la fórmula Mifflin-St Jeor. Es una estimación — ajusta según tu progreso real.</div>
                </div>
              )}
            </>
          )}

          {/* ── INGREDIENTES PERSONALIZADOS ── */}
          {tab === "custom" && (
            <>
              <div style={ST.cardGreen}>
                <div style={{ fontSize: 13, color: "#7fff7f", fontWeight: 600, marginBottom: 6 }}>¿No encuentras un ingrediente?</div>
                <div style={{ fontSize: 12, color: "#666", lineHeight: 1.7 }}>Añádelo aquí con los valores del envase (por 100g). Aparecerá automáticamente en la calculadora y en la búsqueda.</div>
              </div>

              <div style={ST.card}>
                <div style={{ ...ST.label, marginBottom: 14 }}>Nuevo ingrediente</div>
                <div style={{ marginBottom: 10 }}>
                  <div style={{ ...ST.label, fontSize: 10, marginBottom: 5 }}>Nombre del alimento *</div>
                  <input style={ST.input} placeholder='Ej: "Hamburguesa de soja marca X"' value={newName} onChange={e => setNewName(e.target.value)} />
                </div>
                <div style={{ marginBottom: 12 }}>
                  <div style={{ ...ST.label, fontSize: 10, marginBottom: 5 }}>Emoji (opcional)</div>
                  <input style={{ ...ST.input, width: 70 }} placeholder="🌿" value={newEmoji} onChange={e => setNewEmoji(e.target.value)} />
                </div>
                <div style={{ ...ST.label, fontSize: 10, marginBottom: 8 }}>Valores por 100g (mira el envase) *</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
                  {[
                    { lbl: "Calorías (kcal) *", val: newKcal, set: setNewKcal, ph: "Ej: 350" },
                    { lbl: "Proteínas (g)", val: newProt, set: setNewProt, ph: "Ej: 24" },
                    { lbl: "Carbohidratos (g)", val: newCarbs, set: setNewCarbs, ph: "Ej: 60" },
                    { lbl: "Grasas (g)", val: newFat, set: setNewFat, ph: "Ej: 1.2" },
                  ].map(f => (
                    <div key={f.lbl}>
                      <div style={{ ...ST.label, fontSize: 10, marginBottom: 5 }}>{f.lbl}</div>
                      <input type="number" style={ST.input} placeholder={f.ph} value={f.val} onChange={e => f.set(e.target.value)} />
                    </div>
                  ))}
                </div>
                <button style={{ ...ST.btnPrimary, width: "100%", opacity: !newName || !newKcal ? 0.5 : 1 }}
                  onClick={addCustomFood} disabled={!newName || !newKcal}>
                  ➕ Añadir a mi calculadora
                </button>
                {savedMsg && <div style={{ marginTop: 10, fontSize: 12, color: "#7fff7f", textAlign: "center" }}>{savedMsg}</div>}
              </div>

              {customFoods.length > 0 && (
                <div style={ST.card}>
                  <div style={{ ...ST.label, marginBottom: 12 }}>Mis ingredientes añadidos ({customFoods.length})</div>
                  {customFoods.map(f => (
                    <div key={f.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid #161616" }}>
                      <div>
                        <div style={{ fontSize: 13 }}>{f.emoji} {f.name}</div>
                        <div style={{ fontSize: 11, color: "#444", fontFamily: "monospace", marginTop: 2 }}>{f.per100.kcal} kcal · {f.per100.prot}P · {f.per100.carbs}C · {f.per100.fat}G</div>
                      </div>
                      <button style={ST.btnDanger} onClick={() => setCustomFoods(prev => prev.filter(x => x.name !== f.name))}>Eliminar</button>
                    </div>
                  ))}
                </div>
              )}

              {customFoods.length === 0 && (
                <div style={{ textAlign: "center", color: "#2a2a2a", fontSize: 13, padding: "20px 0" }}>
                  Aún no has añadido ningún ingrediente personalizado.
                </div>
              )}
            </>
          )}

        </div>
      </div>
    </>
  );
}
