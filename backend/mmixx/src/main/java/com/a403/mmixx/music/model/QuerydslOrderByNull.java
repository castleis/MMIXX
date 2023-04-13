package com.a403.mmixx.music.model;

import com.querydsl.core.types.NullExpression;
import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;

public class QuerydslOrderByNull extends OrderSpecifier {
	private static final QuerydslOrderByNull DEFAULT = new QuerydslOrderByNull();

	private QuerydslOrderByNull() {
		super(Order.ASC, NullExpression.DEFAULT, NullHandling.Default);
	}

	public static QuerydslOrderByNull getDefault() {
		return QuerydslOrderByNull.DEFAULT;
	}
}
