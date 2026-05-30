import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Send, Sparkles, RefreshCw, User, Bot, Loader, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";
const getToken = () => localStorage.getItem("token") || sessionStorage.getItem("token");

// Suggested question buttons will be rendered inline where needed.
// (Removed the old SuggestionChip to ensure wrapping and responsive behaviors.)

// ─── Single chat bubble ───────────────────────────────────────────────────────
const Bubble = ({ msg }) => {
  const isUser = msg.role === "user";
  return (
    <div style={{
      display: "flex",
      justifyContent: isUser ? "flex-end" : "flex-start",
      alignItems: "flex-end",
      gap: 8,
      marginBottom: 16,
    }}>
      {!isUser && (
        <div style={styles.botAvatar}>
          <Bot size={16} color="#6366f1" />
        </div>
      )}
      <div style={{
        maxWidth: "75%",
        padding: "12px 16px",
        borderRadius: isUser ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
        background: isUser ? "linear-gradient(135deg,#6366f1,#8b5cf6)" : "var(--color-background-secondary)",
        color: isUser ? "#fff" : "var(--color-text-primary)",
        fontSize: 14,
        lineHeight: 1.6,
        border: isUser ? "none" : "0.5px solid var(--color-border-tertiary)",
      }}>
        {msg.content}
      </div>
      {isUser && (
        <div style={styles.userAvatar}>
          <User size={16} color="#fff" />
        </div>
      )}
    </div>
  );
};

// ─── Typing indicator ─────────────────────────────────────────────────────────
const TypingIndicator = () => (
  <div style={{ display: "flex", alignItems: "flex-end", gap: 8, marginBottom: 16 }}>
    <div style={styles.botAvatar}>
      <Bot size={16} color="#6366f1" />
    </div>
    <div style={{
      padding: "12px 16px",
      borderRadius: "18px 18px 18px 4px",
      background: "var(--color-background-secondary)",
      border: "0.5px solid var(--color-border-tertiary)",
      display: "flex", gap: 4, alignItems: "center",
    }}>
      {[0, 1, 2].map(i => (
        <div key={i} style={{
          width: 7, height: 7, borderRadius: "50%",
          background: "#a5b4fc",
          animation: "bounce 1.2s ease-in-out infinite",
          animationDelay: `${i * 0.2}s`,
        }} />
      ))}
    </div>
  </div>
);

// ─── Main component ───────────────────────────────────────────────────────────
const BudgetCoach = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState("");
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  // scroll to bottom on new message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // load initial analysis
  useEffect(() => {
    loadInitialAnalysis();
  }, []);

  const loadInitialAnalysis = async () => {
    setInitialLoading(true);
    setError("");
    setMessages([]);
    setSuggestions([]);
    try {
      const res = await axios.get(`${API_URL}/budget-coach`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      const { message, suggestions: sugg } = res.data.data;
      setMessages([{ role: "bot", content: message }]);
      setSuggestions(sugg || []);
    } catch (err) {
      setError(err.response?.data?.message || "Could not load analysis. Please try again.");
    } finally {
      setInitialLoading(false);
    }
  };

  const sendMessage = async (text) => {
    const userMsg = text || input.trim();
    if (!userMsg || loading) return;

    setInput("");
    setSuggestions([]);

    // add user message
    const updatedMessages = [...messages, { role: "user", content: userMsg }];
    setMessages(updatedMessages);
    setIsTyping(true);
    setLoading(true);

    try {
      // send only last 6 messages as history to keep context short
      const history = updatedMessages.slice(-6).slice(0, -1).map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await axios.post(
        `${API_URL}/budget-coach/chat`,
        { message: userMsg, history },
        { headers: { Authorization: `Bearer ${getToken()}` } }
      );

      setMessages((prev) => [...prev, { role: "bot", content: res.data.data.reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: "Sorry, kuch problem aa gayi. Please try again! 🙏" },
      ]);
    } finally {
      setIsTyping(false);
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={styles.headerIcon}>
            <Sparkles size={20} color="#6366f1" />
          </div>
          <div>
            <h2 style={styles.title}>CashPilot AI Coach</h2>
<p style={styles.subtitle}>
  Ask anything about your finances
</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <button
            onClick={() => navigate('/')}
            title="Back to dashboard"
            style={{
              padding: '8px 12px',
              borderRadius: 10,
              border: '1px solid #e2e8f0',
              background: '#fff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              color: '#475569',
              fontFamily: 'inherit'
            }}
          >
            <ArrowLeft size={14} />
            <span>Back</span>
          </button>

          <button
            onClick={loadInitialAnalysis}
            disabled={initialLoading}
            style={{ ...styles.refreshBtn, opacity: initialLoading ? 0.5 : 1 }}
            title="Start fresh"
          >
            <RefreshCw size={14} style={{ animation: initialLoading ? "spin 1s linear infinite" : "none" }} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Chat window */}
      <div style={styles.chatWindow}>

        {/* Initial loading */}
        {initialLoading && (
          <div style={styles.centerBox}>
            <div style={styles.loadingIcon}>
              <Sparkles size={24} color="#6366f1" style={{ animation: "spin 2s linear infinite" }} />
            </div>
           <p style={{ fontSize: 14, color: "#64748b", marginTop: 12 }}>
  Analyzing your financial data...
</p>
          </div>
        )}

        {/* Error */}
        {!initialLoading && error && (
          <div style={styles.centerBox}>
            <p style={{ fontSize: 14, color: "var(--color-text-danger)", textAlign: "center" }}>{error}</p>
            <button onClick={loadInitialAnalysis} style={styles.retryBtn}>Try Again</button>
          </div>
        )}

        {/* Messages */}
        {!initialLoading && !error && (
          <>
            {messages.map((msg, i) => <Bubble key={i} msg={msg} />)}
            {isTyping && <TypingIndicator />}
            <div ref={bottomRef} />
          </>
        )}
      </div>

      {/* Suggested Questions (responsive) */}
      {suggestions.length > 0 && !loading && (
        <div style={{ ...styles.chipsRow, width: '100%', boxSizing: 'border-box' }}>
          {suggestions.map((s, i) => (
            <button
              key={i}
              onClick={() => sendMessage(s)}
              disabled={loading}
              className={"w-full text-left whitespace-normal wrap-break-word py-3 px-4 rounded-xl"}
              style={{
                wordBreak: 'break-word',
                hyphens: 'auto',
                border: '1px solid #e6e9ef',
                background: '#fff',
                color: '#0f172a',
                marginBottom: 8,
                fontSize: 14,
                boxShadow: '0 4px 10px rgba(2,6,23,0.03)',
                textAlign: 'left',
                alignSelf: 'stretch',
              }}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input box */}
      <div style={styles.inputRow}>
        <div style={styles.inputWrap}>
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
placeholder="Ask anything — 'Where can I save money?' or 'How much did I spend on Food?'"
            disabled={loading || initialLoading}
            rows={1}
            style={styles.textarea}
          />
          <button
            onClick={() => sendMessage()}
            disabled={!input.trim() || loading || initialLoading}
            style={{
              ...styles.sendBtn,
              opacity: !input.trim() || loading ? 0.5 : 1,
              cursor: !input.trim() || loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? <Loader size={18} style={{ animation: "spin 1s linear infinite" }} /> : <Send size={18} />}
          </button>
        </div>
       <p style={styles.hint}>
  Press Enter to send • Shift + Enter for a new line
</p>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-6px); }
        }
        textarea:focus { outline: none; border-color: #6366f1 !important; box-shadow: 0 0 0 3px rgba(99,102,241,.15) !important; }
        textarea { resize: none; }
      `}</style>
    </div>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = {
  page: {
    fontFamily: "var(--font-sans)",
    maxWidth: 850,
    margin: "0 auto",
    padding: "1.5rem",
    display: "flex",
    flexDirection: "column",
    height: "calc(100vh - 80px)",
  },

  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
    flexShrink: 0,
  },

  headerIcon: {
    width: 46,
    height: 46,
    borderRadius: 16,
    background: "linear-gradient(135deg,#dbeafe,#ede9fe)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontSize: 22,
    fontWeight: 700,
    color: "#0f172a",
    margin: 0,
  },

  subtitle: {
    fontSize: 13,
    color: "#64748b",
    margin: "4px 0 0",
  },

  refreshBtn: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    padding: "8px 14px",
    borderRadius: 12,
    border: "1px solid #e2e8f0",
    background: "#fff",
    cursor: "pointer",
    fontSize: 13,
    color: "#475569",
    fontFamily: "inherit",
  },

  chatWindow: {
    flex: 1,
    overflowY: "auto",
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    background: "#fafcff",
    border: "1px solid #e2e8f0",
    borderRadius: "24px",
    boxShadow: "0 10px 30px rgba(0,0,0,.05)",
  },

  botAvatar: {
    width: 34,
    height: 34,
    borderRadius: "50%",
    background: "linear-gradient(135deg,#dbeafe,#ede9fe)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  userAvatar: {
    width: 34,
    height: 34,
    borderRadius: "50%",
    background: "linear-gradient(135deg,#0ea5e9,#2563eb)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  centerBox: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },

  loadingIcon: {
    width: 70,
    height: 70,
    borderRadius: "50%",
    background: "linear-gradient(135deg,#dbeafe,#ede9fe)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  chipsRow: {
    display: "flex",
    gap: 8,
    flexWrap: "wrap",
    padding: "10px 0",
    flexShrink: 0,
  },

  inputRow: {
    flexShrink: 0,
    paddingTop: 10,
  },

  inputWrap: {
    display: "flex",
    gap: 10,
    alignItems: "flex-end",
    background: "#fff",
    border: "1px solid #e2e8f0",
    borderRadius: 18,
    padding: "12px 12px 12px 16px",
    boxShadow: "0 4px 15px rgba(0,0,0,.05)",
  },

  textarea: {
    flex: 1,
    border: "none",
    background: "transparent",
    fontSize: 14,
    color: "#0f172a",
    fontFamily: "inherit",
    lineHeight: 1.5,
    maxHeight: 120,
    overflowY: "auto",
  },

  sendBtn: {
    width: 42,
    height: 42,
    borderRadius: 14,
    background: "linear-gradient(135deg,#0ea5e9,#2563eb)",
    border: "none",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    transition: "all .2s",
  },

  hint: {
    fontSize: 11,
    color: "#64748b",
    textAlign: "right",
    margin: "6px 4px 0",
  },

  retryBtn: {
    padding: "8px 20px",
    borderRadius: 12,
    border: "1px solid #e2e8f0",
    background: "#fff",
    cursor: "pointer",
    fontSize: 14,
    color: "#0f172a",
    fontFamily: "inherit",
  },
};

export default BudgetCoach;
