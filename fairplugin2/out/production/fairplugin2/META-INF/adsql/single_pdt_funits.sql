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
         b.id m_product_id,
         sum(a.qty) qty,
         sum(amt_list) amt_list,
         sum(amt) amt
    from b_foitem a, m_product b, b_pdt_pairup c
   where a.m_product_id = c.m_pair_id
     and b.id = c.m_product_id
     and b.ismodel = 'Y'
     and b.id = ?
   group by a.b_fo_id, b.id)
select bfu.id,
       bfu.description truename,
       case
         when bfu.fotype = 'SUM' then
          'Y'
         else
          'N'
       end haschild,
       sum(bfi.qty) "订量",
       sum(bfi.amt_list) "标准金额"
  from v_funit_cl cl, bcl, b_fo fo, bfi, b_funit bfu
 where cl.b_funit_id = bcl.parent_id
   and bcl.id = fo.b_funit_id
   and fo.id = bfi.b_fo_id
   and cl.b_funit_id = bfu.id
   and cl.parent_id = ?
 group by bfu.id, bfu.description, bfu.fotype/*$pdtid,$pdtid,$parentid*/