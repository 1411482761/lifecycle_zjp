with bcl as
 (select id, parent_id
    from b_funit_cl
  union
  select id, id parent_id
    from b_funit
   where fotype = 'STANDARD'),
bfi as
 (select b_fo_id,
         m_product_id,
         sum(qty) qty,
         sum(amt_list) amt_list,
         sum(amt) amt
    from b_foitem
   where m_product_id = ?
   group by b_fo_id, m_product_id
  union
  select a.b_fo_id,
         c.m_pair_id m_product_id,
         sum(a.qty) qty,
         sum(amt_list) amt_list,
         sum(amt) amt
    from b_foitem a, m_product b, b_pdt_pairup c
   where a.m_product_id = c.m_pair_id
     and b.id = c.m_product_id
     and b.ismodel = 'Y'
     and b.id = ?
   group by a.b_fo_id, c.m_pair_id)
select bfi.m_product_id pdtid,
       m.name "货号",
       m.value "品名",
       sum(bfi.qty) "订量",
       sum(bfi.amt_list) "标准金额"
  from v_funit_cl cl, bfi, bcl, b_fo fo, m_product m
 where cl.b_funit_id = bcl.parent_id
   and bcl.id = fo.b_funit_id
   and fo.id = bfi.b_fo_id
   and bfi.m_product_id = m.id
   and cl.parent_id = ?
 group by bfi.m_product_id, m.name,m.value/*$pdtid,$pdtid,$funitid*/