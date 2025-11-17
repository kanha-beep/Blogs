def calculate_bill(items, discount):
    total = 0
    for price, qty in items:
        total += price * qty
    if total > 1000:
        discount_amt = total * discount
        total -= discount_amt
    return total
def display_summary(bill, items):
    subtotal = 0
    for price, qty in items:
        subtotal += price * qty
    print(f"Subtotal: {subtotal}")
    
    if subtotal > 1000:
        print(f"Discount: {discount * 100}%")
    print(f"Total Bill: Rs {bill}")
discount = 0.1
cart = [(200, 3), (550, 2), (400, 1)]
final_bill = calculate_bill(cart, discount)
display_summary(final_bill, cart)