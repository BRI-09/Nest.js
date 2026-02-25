import React, { useState } from 'react';
import { submitContact } from '../api';
import styles from './Contact.module.css';

const INIT = { name:'', email:'', message:'' };

export default function Contact() {
  const [form,  setForm]  = useState(INIT);
  const [busy,  setBusy]  = useState(false);
  const [msg,   setMsg]   = useState(null);

  const onChange = e => setForm(p=>({...p,[e.target.name]:e.target.value}));

  const onSubmit = async e => {
    e.preventDefault(); setBusy(true); setMsg(null);
    try {
      const res = await submitContact(form);
      setMsg({ type:'success', text: res.message }); setForm(INIT);
    } catch(err) {
      setMsg({ type:'error', text: err.message });
    } finally { setBusy(false); }
  };

  return (
    <section className="section" id="contact">
      <h2 className="section-title">Get in Touch</h2>
      <div className={styles.layout}>
        <div className={styles.info}>
          <p style={{color:'var(--text-muted)',lineHeight:1.7}}>
            Got a project, a question, want to play together in COD, or just want to say hi? Drop me a message. I read each all of your messages. 🐱
          </p>
          <div className={styles.detail}><span>📧</span><a href="mailto:bpananayo@student.apc.edu.ph">bpananayo@student.apc.edu.ph</a></div>
          <div className={styles.detail}><span>🏫</span><span>Asia Pacific College, Philippines</span></div>
          <div className={styles.detail}><span>👾</span><span>6976169537657896961</span></div>
          <div className={styles.detail}><span>🤖</span><span>Used Ai For Structures and Other Parts [link:https://claude.ai/share/4e674dc3-a39b-4ad5-b9de-df84c6670c5f]</span></div>
        </div>

        <form className={styles.form} onSubmit={onSubmit} noValidate>
          <div className="field">
            <label>Name</label>
            <input name="name" type="text" placeholder="Your name" value={form.name} onChange={onChange} required minLength={2} disabled={busy}/>
          </div>
          <div className="field">
            <label>Email</label>
            <input name="email" type="email" placeholder="you@example.com" value={form.email} onChange={onChange} required disabled={busy}/>
          </div>
          <div className="field">
            <label>Message</label>
            <textarea name="message" rows={4} placeholder="What's on your mind?" value={form.message} onChange={onChange} required minLength={10} disabled={busy}/>
          </div>
          {msg && <div className={`alert alert-${msg.type}`}>{msg.text}</div>}
          <button type="submit" className="btn" disabled={busy} style={{justifyContent:'center'}}>
            {busy ? <><span className="spinner"/> Sending…</> : 'Send Message →'}
          </button>
        </form>
      </div>
    </section>
  );
}
