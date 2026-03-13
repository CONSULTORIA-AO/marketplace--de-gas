'use client';
import { ORANJE, WHITE } from '@/constants/costumer';
import { ChatMessage, Conversation, View } from '@/types/customer';
import { useEffect, useRef, useState } from 'react';
import { Icon } from '@/components/icon';
import { AuthHeader } from '@/components/header';
import { GasProduct } from '@/types/product';
import { Sidebar } from '../../components/sidebar';
import { SmartHeader } from '@/components/layout/smartHeader';

export function MessagesView() {
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: 1,
      seller: {
        name: 'TechStore AO',
        img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&q=80',
      },
      lastMessage: 'O iPhone 15 Pro preto está disponível!',
      lastTime: '10:05',
      unread: 2,
      messages: [
        {
          from: 'seller',
          text: 'Olá! Como posso ajudá-lo com o iPhone 15 Pro?',
          time: '10:02',
        },
        { from: 'user', text: 'Tem disponível em preto?', time: '10:04' },
        {
          from: 'seller',
          text: 'Sim! Temos em preto, prata e titânio. Qual prefere?',
          time: '10:05',
        },
      ],
    },
    {
      id: 6,
      seller: {
        name: 'GameZone AO',
        img: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80',
      },
      lastMessage: 'Inclui 2 jogos à escolha!',
      lastTime: '09:36',
      unread: 0,
      messages: [
        { from: 'seller', text: 'Bom dia! Interesse no PS5?', time: '09:30' },
        { from: 'user', text: 'Sim, inclui jogos?', time: '09:35' },
        {
          from: 'seller',
          text: 'Inclui 2 jogos à escolha do catálogo!',
          time: '09:36',
        },
      ],
    },
    {
      id: 7,
      seller: {
        name: 'Fashion AO',
        img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
      },
      lastMessage: 'O vestido floral chegou novo stock',
      lastTime: 'ontem',
      unread: 1,
      messages: [
        {
          from: 'seller',
          text: 'O vestido floral chegou novo stock',
          time: 'ontem',
        },
      ],
    },
  ]);

  const [activeConversation, setActiveConversation] =
    useState<Conversation | null>(null);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const [searchChat, setSearchChat] = useState<string>('');
  const [input, setInput] = useState<string>('');
  const bottomRef = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<View>('produtos');
  const [favorites, setFavorites] = useState<GasProduct[]>([]);
  const [search, setSearch] = useState<string>('');
  const [sidebarOpen, setSidebar] = useState<boolean>(false);

  useEffect(() => {
    if (activeConversation) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeConversation]);

  const send = (): void => {
    if (!activeConversation || !input.trim()) return;
    const newMsg: ChatMessage = {
      from: 'user',
      text: input,
      time: new Date().toLocaleTimeString('pt', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === activeConversation.id
          ? {
              ...conv,
              messages: [...conv.messages, newMsg],
              lastMessage: input,
              lastTime: newMsg.time,
              unread: 0,
            }
          : conv
      )
    );
    setActiveConversation((prev) =>
      prev ? { ...prev, messages: [...prev.messages, newMsg] } : null
    );
    setInput('');

    setTimeout(() => {
      const reply: ChatMessage = {
        from: 'seller',
        text: 'Obrigado pela mensagem! Responderei em breve.',
        time: new Date().toLocaleTimeString('pt', {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };
      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === activeConversation.id
            ? {
                ...conv,
                messages: [...conv.messages, reply],
                lastMessage: reply.text,
                lastTime: reply.time,
              }
            : conv
        )
      );
    }, 1500);
  };

  const filteredConversations: Conversation[] = conversations.filter(
    (c) =>
      (filter === 'unread' ? c.unread > 0 : true) &&
      c.seller.name.toLowerCase().includes(searchChat.toLowerCase())
  );

  if (activeConversation) {
    const messages = activeConversation.messages;
    return (
      <div
        className="fade-in"
        style={{
          maxWidth: 640,
          margin: '0 auto',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            background: 'white',
            borderRadius: '14px 14px 0 0',
            padding: '14px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            borderBottom: '1px solid #F3F4F6',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          }}
        >
          <button
            onClick={() => setActiveConversation(null)}
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <Icon name="back" color={ORANJE} />
          </button>
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: '50%',
              overflow: 'hidden',
            }}
          >
            <img
              src={activeConversation.seller.img}
              alt=""
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <div>
            <p style={{ fontWeight: 700, fontSize: 14, margin: 0 }}>
              {activeConversation.seller.name}
            </p>
            <p style={{ fontSize: 11, color: '#10B981', margin: 0 }}>
              ● Online
            </p>
          </div>
        </div>

        <div
          style={{
            background: '#F8FAFF',
            flex: 1,
            overflowY: 'auto',
            padding: 16,
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
          }}
        >
          {messages.map((m, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                justifyContent: m.from === 'user' ? 'flex-end' : 'flex-start',
              }}
            >
              <div
                style={{
                  maxWidth: '75%',
                  padding: '10px 14px',
                  borderRadius:
                    m.from === 'user' ? '14px 14px 0 14px' : '14px 14px 14px 0',
                  background: m.from === 'user' ? ORANJE : 'white',
                  color: m.from === 'user' ? 'white' : '#111',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                  fontSize: 13,
                }}
              >
                <p style={{ margin: 0, lineHeight: 1.5 }}>{m.text}</p>
                <p
                  style={{
                    margin: '4px 0 0',
                    fontSize: 10,
                    opacity: 0.6,
                    textAlign: 'right',
                  }}
                >
                  {m.time}
                </p>
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        <div
          style={{
            background: 'white',
            borderRadius: '0 0 14px 14px',
            padding: '12px 16px',
            display: 'flex',
            gap: 10,
            border: '1px solid #F3F4F6',
            borderTop: 'none',
          }}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && send()}
            placeholder="Escreva uma mensagem..."
            style={{
              flex: 1,
              padding: '10px 14px',
              borderRadius: 10,
              border: '1.5px solid #E5E7EB',
              fontSize: 13,
            }}
          />
          <button
            onClick={send}
            style={{
              padding: '10px 18px',
              borderRadius: 10,
              background: ORANJE,
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontWeight: 600,
            }}
          >
            <Icon name="send" size={15} color="white" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {sidebarOpen && (
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 400, display: 'flex' }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(0,0,0,0.4)',
            }}
            onClick={() => setSidebar(false)}
          />
          <Sidebar
            favorites={favorites.length}
            close={() => setSidebar(false)}
            currentView={view}
          />
        </div>
      )}

      <SmartHeader
        search={search}
        setSearch={setSearch}
        onMenu={() => setSidebar(true)}
        onSearch={(term) => setSearch(term)}
      />
      <div className="fade-in" style={{ maxWidth: 640, margin: '0 auto' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            marginBottom: 20,
          }}
        >
          <h2
            style={{ fontSize: 20, fontWeight: 800, margin: 0, color: '#111' }}
          >
            Mensagens
          </h2>
        </div>

        <div
          style={{
            display: 'flex',
            gap: 8,
            marginBottom: 16,
            flexWrap: 'wrap',
          }}
        >
          <input
            value={searchChat}
            onChange={(e) => setSearchChat(e.target.value)}
            placeholder="Pesquisar conversas..."
            style={{
              flex: 1,
              padding: '10px 14px',
              borderRadius: 10,
              border: '1.5px solid #E5E7EB',
              fontSize: 13,
              background: 'white',
            }}
          />
          <button
            onClick={() => setFilter(filter === 'unread' ? 'all' : 'unread')}
            style={{
              padding: '8px 16px',
              borderRadius: 10,
              background: filter === 'unread' ? ORANJE : WHITE,
              color: filter === 'unread' ? 'white' : ORANJE,
              border: 'none',
              fontWeight: 600,
              fontSize: 13,
              cursor: 'pointer',
              minWidth: 100,
            }}
          >
            {filter === 'unread' ? 'Todas' : 'Não lidas'}
          </button>
        </div>

        {filteredConversations.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '80px 20px',
              color: '#9CA3AF',
              fontSize: 15,
            }}
          >
            <Icon name="chat" size={48} color="#D1D5DB" />
            <p style={{ marginTop: 16 }}>Nenhuma conversa encontrada</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {filteredConversations.map((conv) => (
              <div
                key={conv.id}
                onClick={() => {
                  setActiveConversation(conv);
                  setConversations((prev) =>
                    prev.map((c) =>
                      c.id === conv.id ? { ...c, unread: 0 } : c
                    )
                  );
                }}
                style={{
                  background: 'white',
                  borderRadius: 14,
                  padding: 14,
                  display: 'flex',
                  gap: 12,
                  alignItems: 'center',
                  border: '1px solid #F3F4F6',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                  boxShadow:
                    conv.unread > 0 ? '0 2px 12px rgba(18,89,195,0.1)' : 'none',
                }}
              >
                <div style={{ position: 'relative' }}>
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: '50%',
                      overflow: 'hidden',
                      border: `2px solid ${conv.unread > 0 ? ORANJE : '#E5E7EB'}`,
                    }}
                  >
                    <img
                      src={conv.seller.img}
                      alt=""
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </div>
                  {conv.unread > 0 && (
                    <span
                      style={{
                        position: 'absolute',
                        top: -2,
                        right: -2,
                        minWidth: 18,
                        height: 18,
                        borderRadius: '50%',
                        background: ORANJE,
                        color: 'white',
                        fontSize: 11,
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '0 4px',
                      }}
                    >
                      {conv.unread}
                    </span>
                  )}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'baseline',
                    }}
                  >
                    <p
                      style={{
                        fontWeight: conv.unread > 0 ? 700 : 600,
                        fontSize: 14,
                        margin: 0,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {conv.seller.name}
                    </p>
                    <span
                      style={{
                        fontSize: 11,
                        color: '#9CA3AF',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {conv.lastTime}
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: 13,
                      color: conv.unread > 0 ? '#111' : '#6B7280',
                      margin: '3px 0 0',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {conv.lastMessage}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
